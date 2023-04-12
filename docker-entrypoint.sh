#!/bin/bash
set -e

./env-guard.sh
./string-env-replacer -f . -r "process\.env\.([\\w\\d_]+)" -t "\"{env_var}\"" /srv/html
./prefix-replacer.sh
nginx -g "daemon off;"
