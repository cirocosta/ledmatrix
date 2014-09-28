'use strict';

var yaspm = require('yaspm');
var Machines = yaspm.Machines('');
var Actions = require('../actions/Actions');

var _devices = [];

function handleConnect (device) {
  Actions.Settings.addDevice({device: device});
}

function handleDisconnect (device) {
  Actions.Settings.removeDevice({id: device.getInfo().pnpId});
}

function init () {
  Machines
    .search()
    .on('device', function (device) {
      device
        .connect()
        .on('connect', handleConnect.bind(null, device))
        .on('disconnect', handleDisconnect.bind(null, device));
    })
    .on('removeddevice', handleDisconnect);
}

/**
 * Fake init implementation -- testing only.
 */
function fakeInit () {
  var device = new yaspm.FakeDevice();
  device.getInfo = () => {
    return {
      pnpId: 'arduino-fake-pnpId'
    };
  };

  setTimeout(() => {
    Actions.Settings.addDevice({device: device});
  }, 1000);
}

module.exports = {
  init: init,
  // init: fakeInit,
  getDevices: () => _devices
};
