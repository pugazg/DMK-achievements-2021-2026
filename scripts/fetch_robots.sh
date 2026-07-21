#!/bin/bash
# Fetch robots.txt for every distinct host in the source registry, so that
# automation_allowed reflects each site's stated policy rather than an assumption.
cd "$(dirname "$0")/.." || exit 1
UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0 Safari/537.36"
OUTDIR="sources/robots"
mkdir -p "$OUTDIR"
: > "$OUTDIR/index.tsv"
# node emits "origin<TAB>safe-filename" so both sides agree on the naming.
node -e "
const r=require('./src/data/sourceRegistry.json');
const o=[...new Set(r.sources.map(s=>new URL(s.index_url).origin))];
o.forEach(x=>console.log(x+'\t'+x.replace(/^https?:\/\//,'').replace(/[^A-Za-z0-9._-]/g,'_')+'.txt'));
" | while IFS=$'\t' read -r origin file; do
  code=$(curl -s -m 30 -A "$UA" -L -o "$OUTDIR/$file" -w "%{http_code}" "$origin/robots.txt" 2>/dev/null)
  printf '%s\t%s\t%s\n' "$origin" "$code" "$file" >> "$OUTDIR/index.tsv"
done
