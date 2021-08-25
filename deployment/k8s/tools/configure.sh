#!/bin/bash
# Copyright (c) 2018 AccelByte Inc. All Rights Reserved.
# This is licensed software from AccelByte Inc, for limitations
# and restrictions contact your company contract manager

# NOTE!!!: This is temporary solution, we will use helm chart in the future, at this
# current step we made this to simplify the manual deployment processes

function usage() {
  cat << EOF
    Execute this script under the same directory (deployment/k8s/tools)
    Example :
      ./configure.sh -f [config-file(default: config.conf)] -c [true/false default:false (Create Flagger's Canary object)]
EOF
  exit 0
}

function init() {
  readonly orig_cwd="$PWD"
  readonly script_path="${BASH_SOURCE[0]}"
  readonly script_dir="$(dirname "$script_path")"
  readonly script_name="$(basename "$script_path")"
  readonly noaws_dir=${orig_cwd}/../no-aws-credentials
  readonly withaws_dir=${orig_cwd}/../with-aws-credentials
  readonly output_dir=${orig_cwd}/output
  readonly sed_template=${output_dir}/sed.sed
  readonly generatedconfigfile=${output_dir}/generatedconfigfile.conf
  readonly deployment_id=$(date +%s%N)

  create_canary_object="false"
  configfile=${orig_cwd}/config.conf

  if [[ ! -f configure.sh ]]; then
    usage
  fi

  rm -rf ${output_dir}
  mkdir -p ${output_dir}
}

function readconfig() {
  # remove comments, blank lines, trailing whitespaces
  sed '/^[[:blank:]]*#/d;s/#.*//' $1 | sed '/^$/d' | sed 's/[[:space:]]*$//' >> ${generatedconfigfile}
  # create sed template
  sed 's/^/s#</' ${generatedconfigfile} | sed 's/=/>#/' | sed 's/$/#g/' >> ${sed_template}
  source ${generatedconfigfile}
}

function configure_yaml() {
  cp ${orig_cwd}/../*.yaml ${output_dir}/


  if [[ ${USE_FLAGGER_WEBHOOK} == "true" ]];then
    cp ${orig_cwd}/../flagger/03_canary_with_webhook.yaml ${output_dir}/
  else
    cp ${orig_cwd}/../flagger/03_canary_no_webhook.yaml ${output_dir}/
  fi

  if [[ $create_canary_object == "false" ]]; then
    rm ${output_dir}/*canary*.yaml
  fi

  for i in `ls ${output_dir}/*.yaml`; do
    echo ${i}
    sed -i -f ${sed_template} ${i}
    sed -i "s/<DEPLOYMENT_ID>/'$deployment_id'/g" $i
  done

  rm -rf ${generatedconfigfile}
  rm -rf ${sed_template}
}

function main() {
  init
  while getopts f:c:h option
  do
    case "${option}"
      in
      f) configfile=${OPTARG};;
      c) create_canary_object=${OPTARG};;
      h) usage;;
    esac
  done
  readconfig ${configfile}
  configure_yaml
}

main "$@"
