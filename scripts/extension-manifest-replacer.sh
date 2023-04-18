#!/bin/bash

# get manifest content
filename="/srv/html/admin-extension/extension-manifest.json"
manifest_content=$(<$filename)

# make sure client name defined
client_name_env="EXTENSION_CLIENT_NAME"
if [ -z "${!client_name_env}" ]; then
  echo "$client_name_env is undefined"
else
  # generate client name value
  client_name_current_value=`sed 's/.*"clientName": "\(.*\)".*/\1/;t;d' $filename`
  client_name_value="$EXTENSION_CLIENT_NAME"
  client_name_placeholder="\"clientName\": \"$client_name_current_value\""
  client_name_result="${client_name_placeholder/"\"$client_name_current_value\""/"\"$client_name_value\""}"

  # replace client name placeholder
  manifest_content="${manifest_content/$client_name_placeholder/$client_name_result}"

  # replace extension-manifest.json content
  echo "$manifest_content" > $filename
fi

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

# replace prefix placeholder
manifest_content="${manifest_content/$prefix_placeholder/$prefix_result}"

# replace extension-manifest.json content
echo "$manifest_content" > $filename
