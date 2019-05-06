#!/usr/bin/env bash

export WORKING_DIR=$1

if [ ! -d $WORKING_DIR ]
then
  echo "Error: directory $WORKING_DIR does not exist"
  exit 1
fi

MAPFILES_COUNT=`ls -1 $WORKING_DIR/*.map 2>/dev/null | wc -l`
if [ ! $MAPFILES_COUNT != 0 ]; then
  echo "Error: directory $WORKING_DIR does not contain any .map files"
  exit 1
fi

docker-compose run mapproxy seed "${@:2}"
docker-compose stop mapserver
