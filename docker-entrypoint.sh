#!/bin/bash
set -e

./env-guard.sh
./string-env-replacer -f . -r "process.env\\[\"([\\w\\d]+)\"\\]" -t "{env_var}" /srv/html
nginx -g "daemon off;"
