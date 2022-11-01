#!/bin/bash

# make sure prefix defined
prefix_env="JUSTICE_ADMINPORTAL_ROUTE_PREFIX"
if [ -z "${!prefix_env}" ]; then
  echo "$prefix_env is undefined"
  exit
fi

# generate prefix value
prefix_value="$JUSTICE_ADMINPORTAL_ROUTE_PREFIX"
prefix_placeholder="\"prefix\": \"\""
prefix_result="${prefix_placeholder/"\"\""/"\"$prefix_value\""}"

# get manifest content and replace prefix placeholder
filename="/srv/html/admin-extension/extension-manifest.json"
manifest_content=$(<$filename)
manifest_content="${manifest_content/$prefix_placeholder/$prefix_result}"

# replace extension-manifest.json content
echo "$manifest_content" > $filename
