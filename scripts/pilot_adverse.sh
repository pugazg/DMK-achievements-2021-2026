#!/bin/bash
# Phase C0 — retrieve ADVERSE / independent evidence for the pilot.
#
# The pilot's whole point is to test whether the evidence model can hold the
# complete picture, not just the supporting half. This fetches the CAG audit
# listings for Tamil Nadu (the only independent-official authority in the
# registry) plus Finance policy notes, and records what was actually retrieved
# with a sha256. Nothing here is interpreted by this script.
#
# robots.txt for cag.gov.in and financedept.tn.gov.in: 404 = no restrictions.
cd "$(dirname "$0")/.." || exit 1
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
OUT="sources/pilot_c0"
MAN="$OUT/manifest.tsv"
mkdir -p "$OUT"
printf 'name\turl\thttp\tbytes\tsha256\tcontent_type\tnote\n' > "$MAN"

fetch () { # name url note
  local name="$1" url="$2" note="$3" f="$OUT/$1"
  local code ctype
  read -r code ctype < <(curl -s -m 90 -A "$UA" -L -o "$f" -w "%{http_code} %{content_type}" "$url" 2>/dev/null)
  local bytes sha
  if [ -s "$f" ]; then bytes=$(wc -c < "$f" | tr -d ' '); sha=$(shasum -a 256 "$f" | cut -d' ' -f1); else bytes=0; sha="-"; fi
  printf '%s\t%s\t%s\t%s\t%s\t%s\t%s\n' "$name" "$url" "$code" "$bytes" "$sha" "$ctype" "$note" >> "$MAN"
  echo "$(date +%H:%M:%S) $name -> $code ${bytes}B" >> "$OUT/progress.log"
}

fetch cag_ag1_tn_audit_reports.html "https://cag.gov.in/ag1/tamil-nadu/en/audit-report" "CAG AG1 TN audit report listing"
fetch cag_ag2_tn_audit_reports.html "https://cag.gov.in/ag2/tamil-nadu/en/audit-report" "CAG AG2 TN audit report listing"
fetch cag_tn_state_reports.html      "https://cag.gov.in/en/audit-report/listing?state=32" "CAG state-wise report listing (TN)"
fetch fin_policy_notes.html          "https://financedept.tn.gov.in/en/policy-notes/" "TN Finance policy notes index"
fetch fin_budget_publications.html   "https://financedept.tn.gov.in/en/budget-publications/" "TN Finance budget publications index"
fetch tn_press_index.html            "https://www.tn.gov.in/press_release.php" "TN press release index"

echo "DONE $(date +%H:%M:%S)" >> "$OUT/progress.log"
