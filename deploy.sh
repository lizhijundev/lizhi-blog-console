#!/usr/bin/env bash
set -e
npm run build
cd dist
touch .nojekyll
git init
git add -A
git commit -m 'deploy'
git push -f "https://${access_token}@gitee.com/chu1204505056/admin-plus.git" master:gh-pages
#git push -f "https://${access_token}@e.coding.net/chu1204505056/vab/admin-plus.git" master
start "https://gitee.com/chu1204505056/admin-plus/pages"
cd -
exec /bin/bash
