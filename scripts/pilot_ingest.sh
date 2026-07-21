#!/bin/bash
# Phase 6 pilot ingestion: fetch ONE small sample document per reachable
# Tier-1 priority source, record sha256 + metadata. No CAPTCHA bypass, no
# bulk scraping. Failures are recorded, not hidden.
cd "$(dirname "$0")/.." || exit 1
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
mkdir -p sources/pilot
M="sources/pilot/manifest.tsv"
echo -e "source_id\turl\thttp\tbytes\tsha256\tcontent_type\tnote" > "$M"

fetch () { # id url note
  local id="$1" url="$2" note="$3" out="sources/pilot/$1"
  res=$(curl -s -m 60 -A "$UA" -L -o "$out" -w "%{http_code}\t%{size_download}\t%{content_type}" "$url" 2>/dev/null)
  code=$(echo "$res"|cut -f1); bytes=$(echo "$res"|cut -f2); ct=$(echo "$res"|cut -f3)
  if [ "$code" = "200" ] && [ -s "$out" ]; then
    sha=$(shasum -a 256 "$out" | cut -d' ' -f1)
  else
    sha="-"; rm -f "$out"
  fi
  echo -e "$id\t$url\t$code\t$bytes\t$sha\t$ct\t$note" >> "$M"
  echo "$(date +%H:%M:%S) $id -> $code ($bytes bytes)" >> sources/pilot/progress.log
  sleep 1
}

# Priority 8 — Economic Survey highlights PDFs (direct links from the link pack)
fetch "spc_es2526_highlights.pdf" "https://spc.tn.gov.in/wp-content/uploads/Economic-Survey-Highlights-Eng.pdf" "Economic Survey 2025-26 highlights"
fetch "spc_es2425_highlights.pdf" "https://spc.tn.gov.in/wp-content/uploads/ES_TN-English.pdf" "Economic Survey 2024-25 highlights"
fetch "spc_sif20.pdf" "https://spc.tn.gov.in/wp-content/uploads/TN-SIF-2.0.pdf" "TN State Indicator Framework 2.0"
# Priority 1 — Finance Dept index pages (HTML index snapshots, small)
fetch "fin_budget_publications.html" "https://financedept.tn.gov.in/en/budget-publications/" "Finance budget publications index"
fetch "fin_policy_notes.html" "https://financedept.tn.gov.in/en/policy-notes/" "Finance policy notes index"
# Priority 3 — CAG TN audit-report listing
fetch "cag_ag1_tn_reports.html" "https://cag.gov.in/ag1/tamil-nadu/en/audit-report" "CAG AG1 TN audit report listing"
# Priority 5 — DMK manifesto resource page (party source; discovery only)
fetch "dmk_manifesto_page.html" "https://www.dmk.in/en/resources/manifesto/" "DMK manifesto resource page (party source)"
# Priority 6 — TN press release index
fetch "tn_press_index.html" "https://www.tn.gov.in/press_release.php" "TN press release index"
# Priority 4 — Assembly legacy debates menu
fetch "tnla_debates_menu.html" "https://www.assembly.tn.gov.in/debates/debates_menu.php" "TNLA legacy debates menu"
# Priority 2 — Department documents index (policy notes)
fetch "tn_dept_docs.html" "https://www.tn.gov.in/document_dept_list.php?cate_name=YWxs" "TN department documents index"

echo "PILOT DONE" >> sources/pilot/progress.log
