var yaspm = require('yaspm');
var Machines = yaspm.Machines('');
var {DeviceActions} = require('../actions');
var _devices = [];

function handleConnect (device) {
  DeviceActions.addDevice({device: device});
}

function handleDisconnect (id) {
  DeviceActions.removeDevice(id);
}

function init () {
  Machines
    .search()
    .on('device', function (device) {
      device
        .connect()
        .on('connect', handleConnect.bind(null, device))
        .on('disconnect', handleDisconnect.bind(null, device.getInfo()));
    })
    .on('removeddevice', handleDisconnect);
}

module.exports = {
  init: init
};
