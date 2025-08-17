#!/usr/bin/env bash
set -e
git reset HEAD --hard 
git clean -f -x -q -d
npm i
npm run build
npm run dev