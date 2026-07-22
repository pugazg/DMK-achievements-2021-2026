#!/bin/bash
# Re-check only the sources that failed the first verification pass.
# Longer timeout + trailing-slash retry. Records status only; no scraping.
cd "$(dirname "$0")/.." || exit 1
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
OUT="scripts/source_recheck.tsv"
: > "$OUT"
awk -F'\t' '$2!="200"{print $1}' scripts/source_verification.tsv | \
while read -r id; do
  url=$(node -e "const r=require('./src/data/sourceRegistry.json');const s=r.sources.find(x=>x.source_id==='$id');console.log(s?s.index_url:'')")
  [ -z "$url" ] && continue
  code=$(curl -s -o /dev/null -m 60 -A "$UA" -L -w "%{http_code}" "$url" 2>/dev/null)
  variant="$url"
  if [ "$code" = "000" ]; then
    case "$url" in */) variant="${url%/}";; *) variant="$url/";; esac
    code2=$(curl -s -o /dev/null -m 60 -A "$UA" -L -w "%{http_code}" "$variant" 2>/dev/null)
  else
    code2="-"
  fi
  printf '%s\t%s\t%s\n' "$id" "$code" "$code2" >> "$OUT"
  echo "$(date +%H:%M:%S) recheck $id -> $code / $code2" >> scripts/verify_progress.log
done
echo "RECHECK DONE" >> scripts/verify_progress.log
