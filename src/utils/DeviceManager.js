var yaspm = require('yaspm');
var Machines = yaspm.Machines('');
var {DeviceActions} = require('../actions');

/**
 * Converts a number to a fixed length
 * hexadecimal string.
 */
var _intToFixedHex = function (num, size) {
  var res = Number(num).toString(16);

  while (res.length < size)
    res = '0' + res;

  return res;
};

/**
 * Converts a matrix to a fixed length string of
 * hex decimal values.
 */
var matrixToHex = (matrix) => {
  var N = matrix.length;
  var repr = [];

  for (var i = 0; i < N; i++)
    repr.push(_intToFixedHex(parseInt(matrix[i].join(''), 2), 3));

  return repr.join('');
};

/**
 * Connect and Disconnect handlers
 */
var handleConnect = (device) => DeviceActions.addDevice({device: device});
var handleDisconnect = (id) => DeviceActions.removeDevice(id);

/**
 * Initializes the device manager.
 */
var init = () => {
  Machines
    .search()
    .on('device', function (device) {
      device
        .connect()
        .on('connect', handleConnect.bind(null, device))
        .on('disconnect', handleDisconnect.bind(null, device.getInfo()));
    })
    .on('removeddevice', handleDisconnect);
};

module.exports = {
  init: init,
  matrixToHex: matrixToHex
};
