#!/usr/bin/env bash

if [ -z $OUTPUT_FOLDER ]; then
	OUTPUT_FOLDER="web";
fi

mkdir -p "$OUTPUT_FOLDER"

cp -r src/static/. "$OUTPUT_FOLDER/"

if [ "$NODE_ENV" = "production" ] || [ "$NODE_ENV" = "staging" ]; then
	cp -f src/static/.htaccess.prod "$OUTPUT_FOLDER/.htaccess"
fi

echo "Static build done!"
