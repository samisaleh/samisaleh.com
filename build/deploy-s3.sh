#!/usr/bin/env bash
set -e

if [ -z ${WEB_BUCKET} ]; then
    echo Variable \"WEB_BUCKET\" missing from environment
    exit 1
fi

aws s3 cp web/dist/ s3://${WEB_BUCKET}/ \
    --metadata-directive REPLACE \
    --exclude "index.html" \
    --cache-control max-age=86400,s-maxage=86400 \
    --recursive

aws s3 cp web/dist/index.html s3://${WEB_BUCKET}/index.html \
    --metadata-directive REPLACE \
    --cache-control max-age=0

cat >./config.json <<EOF
{
  "GIT_HASH": "${GITHUB_SHA}"
}
EOF

aws s3 cp config.json s3://${WEB_BUCKET}/build/config.json \
    --metadata-directive REPLACE \
    --cache-control max-age=0

function join_by { local IFS="$1"; shift; echo "$*"; }

FIVE_MINUTES_AGO=$(date --date='5 minutes ago' --utc +%FT%T.%3NZ)
echo "Checking to see if any objects were created on or before ${FIVE_MINUTES_AGO}"

STALE_ASSETS=$(aws s3api list-objects-v2 \
    --bucket ${WEB_BUCKET} \
    --query 'Contents[?LastModified <= `$FIVE_MINUTES_AGO`].Key' \
    --output text)

if [[ -n ${STALE_ASSETS} ]];then
    echo Found stale assets... Building key list of removals...
    KEYS_TO_REMOVE=()

    for key in ${STALE_ASSETS}
    do
      KEYS_TO_REMOVE+=("{\"Key\":\"${key}\"}")
    done

    OBJECTS_JSON_ARRAY=$(join_by , ${KEYS_TO_REMOVE[@]})
    DELETE_JSON=$(echo "{\"Objects\":[${OBJECTS_JSON_ARRAY}]}" | sed -e 's/[ \t\r\n]//')

    echo "Removing "${#KEYS_TO_REMOVE[@]}" file(s) from S3"
    aws s3api delete-objects \
        --bucket ${WEB_BUCKET} \
        --delete ${DELETE_JSON}
fi
