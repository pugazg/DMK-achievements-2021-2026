#!/bin/bash
# Verify each source-registry URL: record HTTP status + content type. No scraping.
cd "$(dirname "$0")/.." || exit 1
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
OUT="scripts/source_verification.tsv"
: > "$OUT"
node -e "const r=require('./src/data/sourceRegistry.json');r.sources.forEach(s=>console.log(s.source_id+'\t'+s.index_url))" | \
while IFS=$'\t' read -r id url; do
  res=$(curl -s -o /dev/null -m 25 -A "$UA" -L -w "%{http_code}\t%{content_type}\t%{url_effective}" "$url" 2>/dev/null)
  code=$(echo "$res" | cut -f1)
  [ -z "$code" ] && code="ERR"
  echo -e "$id\t$code\t$res" | cut -f1,2,3,4 >> "$OUT"
  echo "$(date +%H:%M:%S) $id -> $code" >> scripts/verify_progress.log
  sleep 0.5
done
echo "DONE $(wc -l < "$OUT")" >> scripts/verify_progress.log
