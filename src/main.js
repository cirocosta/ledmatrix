'use strict';

var yaspm = require('yaspm');
var Machines = yaspm.Machines('');

Machines
  .search()
  .on('device', function (device) {
    console.log('device found!');

    device
      .connect()
      .on('connect', handleConnect.bind(null, device))
      .on('data', handleData.bind(null, device))
      .on('disconnect', handleDisconnect.bind(null, device));
  })
  .on('removeddevice', function (pnpId) {
    console.log('Just removed: ' + pnpId);
  });

function handleData (device, data) {
  console.log(data);
}

function handleConnect (device) {
  console.log('device connected!');
}

function handleDisconnect (device) {
  console.log('device disconnected :(');
}
