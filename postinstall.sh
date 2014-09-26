#!/bin/bash

DIR=$(dirname -- $(readlink -fn -- "$0"))
SP_PATH="./build/serialport/v1.4.6/Release/node-webkit-v11-linux-x64/"

cd ./node_modules/yaspm/node_modules/serialport
node-pre-gyp rebuild --runtime=node-webkit --target=0.8.6

if [ ! -d $SP_PATH ]; then

  if [ -d "./build/serialport/v1.4.6/Release/node-webkit-v0.8.6-linux-x64/" ]; then
    mv "./build/serialport/v1.4.6/Release/node-webkit-v0.8.6-linux-x64/" \
       "$SP_PATH"
  fi

  if [ -d  "./build/serialport/v1.4.6/Release/node-v11-linux-x64/" ]; then
      mv "./build/serialport/v1.4.6/Release/node-v11-linux-x64/" \
         "$SP_PATH"
  fi
fi

cd $DIR
echo "- postinstall complete."
