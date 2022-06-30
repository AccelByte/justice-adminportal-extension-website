#!/bin/bash

errors=()

warnings=()

function must_exists () {
  if [ -z "${!1}" ]; then
    errors=("${errors[@]}" "$1 env var is undefined")
  fi
}

function may_exists () {
  if [ -z "${!1}" ]; then
    warnings=("${warnings[@]}" "$1 env var is undefined")
  fi
}

function must_be_url(){
  local url_regex='(.+)://[-A-Za-z0-9\+&@#/%?=~_|!:,.;]*[-A-Za-z0-9\+&@#/%=~_|]'
  if ! [[ "${!1}" =~ $url_regex ]]; then
    errors=("${errors[@]}" "$1 ${!1} env var is not a URL")
  fi
}

function may_url(){
  local url_regex='(.+)://[-A-Za-z0-9\+&@#/%?=~_|!:,.;]*[-A-Za-z0-9\+&@#/%=~_|]'
  if ! [[ "${!1}" =~ $url_regex ]]; then
    warnings=("${warnings[@]}" "$1 ${!1} env var is not a URL")
  fi
}

# Rules goes after this line

must_exists "JUSTICE_BASE_PATH";
must_exists "JUSTICE_ADMINPORTAL_URL"

may_url "JUSTICE_BASE_URL";
must_be_url "JUSTICE_ADMINPORTAL_URL"

may_exists "JUSTICE_BASE_URL";
may_exists "JUSTICE_PUBLISHER_NAMESPACE";
may_exists "JUSTICE_ADMIN_BEARER_TOKEN_DEVMODE";

# Do not edit after this line

if [ ${#warnings[@]} -ne 0 ]; then
    printf 'Warning: %s\n' "${warnings[@]}"
fi

if [ ${#errors[@]} -ne 0 ]; then
    printf 'Error: %s\n' "${errors[@]}"
    exit 1
fi
