'use strict';

var yaspm = require('yaspm');
var Machines = yaspm.Machines('');
var Actions = require('../actions/SettingsActions');

function handleConnect (device) {
  Actions.Settings.addDevice(device);
}

function handleDisconnect (device) {
  Actions.Settings.removeDevice(device);
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

module.exports = {
  init: init
};
