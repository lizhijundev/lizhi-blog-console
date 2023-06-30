#!/usr/bin/env bash
set -e
git config --global http.proxy http://127.0.0.1:4780;
git config --global https.proxy https://127.0.0.1:4780;

exec /bin/bash