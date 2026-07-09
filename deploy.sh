#!/usr/bin/env bash
# ============================================================
#  Сборка и публикация статичной копии формы на GitHub Pages.
#  Собирает Vite-проект и force-пушит dist/ в ветку gh-pages,
#  которую отдаёт Pages: https://savage070l.github.io/nsj-form-preview/
#  Требуется: node/npm и git с доступом к репозиторию (gh auth login).
# ============================================================
set -euo pipefail
cd "$(dirname "$0")"
REPO_URL="https://github.com/Savage070L/nsj-form-preview.git"

echo "==> npm ci"
npm ci --no-audit --no-fund

echo "==> vite build"
npm run build

echo "==> публикую dist/ → ветка gh-pages"
cd dist
touch .nojekyll
rm -rf .git
git init -q -b gh-pages
git add -A
git -c user.email="preview@local" -c user.name="preview-bot" commit -qm "deploy $(date '+%Y-%m-%d %H:%M')"
git push -q -f "$REPO_URL" gh-pages
rm -rf .git

echo "✓ опубликовано → https://savage070l.github.io/nsj-form-preview/  (обновится за ~1 мин)"
