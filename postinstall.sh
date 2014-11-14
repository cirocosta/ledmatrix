#!/bin/bash

DIR=$(dirname -- $(readlink -fn -- "$0"))
SP_PATH="./build/serialport/v1.4.6/Release/node-webkit-v11-linux-x64/"

# -- yaspm's Serialport node-pre-gyp process

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

# nw-gyp rebuild for MDSN and Socket.io

cd ./node_modules/mdns && nw-rebuild --target=0.8.6 && cd $DIR
cd ./node_modules/socket.io/node_modules/socket.io-client/node_modules/engine.io-client/node_modules/ws && nw-gyp rebuild --target=0.8.6 && cd $DIR
cd ./node_modules/socket.io/node_modules/engine.io/node_modules/ws && nw-gyp rebuild --target=0.8.6 && cd $DIR

echo "- postinstall complete."
