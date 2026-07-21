#!/bin/bash
# Fetch the CAG State Finances Audit Report PDF and attempt text extraction.
# If extraction fails the pilot records the source as identified-but-not-parsed;
# it must never claim a finding it has not read.
cd "$(dirname "$0")/.." || exit 1
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
OUT="sources/pilot_c0"
URL="https://cag.gov.in/uploads/download_audit_report/2025/English-SFAR-2023-24-068f705991fcd54.32361460.pdf"
F="$OUT/cag_sfar_2023-24.pdf"
code=$(curl -s -m 240 -A "$UA" -L -o "$F" -w "%{http_code}" "$URL")
bytes=$(wc -c < "$F" 2>/dev/null | tr -d ' ')
sha=$(shasum -a 256 "$F" 2>/dev/null | cut -d' ' -f1)
echo "http=$code bytes=$bytes sha=$sha"
file "$F"
# Text extraction, best effort. macOS ships no pdftotext by default.
if command -v pdftotext >/dev/null 2>&1; then
  pdftotext -f 1 -l 40 "$F" "$OUT/cag_sfar_toc.txt" 2>/dev/null && echo "EXTRACTED via pdftotext"
else
  python3 - "$F" "$OUT/cag_sfar_toc.txt" <<'PY'
import sys, re, zlib
src, dst = sys.argv[1], sys.argv[2]
raw = open(src, "rb").read()
out = []
for m in re.finditer(rb"stream\r?\n(.*?)endstream", raw, re.S):
    chunk = m.group(1)
    try:
        chunk = zlib.decompress(chunk)
    except Exception:
        continue
    for t in re.findall(rb"\((?:\\.|[^\\()])*\)", chunk):
        s = t[1:-1]
        s = re.sub(rb"\\([()\\])", rb"\1", s)
        try:
            s = s.decode("latin-1")
        except Exception:
            continue
        if len(s.strip()) > 1:
            out.append(s)
text = " ".join(out)
text = re.sub(r"\s+", " ", text)
open(dst, "w").write(text)
print("EXTRACTED_CHARS", len(text))
PY
fi
