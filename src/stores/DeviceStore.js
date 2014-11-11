/**
 * Holds the state and information regarding
 * Devices that may connect to the desktop
 * application.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var DeviceManager = require('../utils/DeviceManager');
var SocketsManager = require('../utils/SocketsManager');
var CONSTANTS = require('../constants');
var GameStore = require('./GameStore');
var assign = require('object-assign');
var Store = require('./Store');

var isEmpty = (obj) => obj ? !Object.keys(obj).length : true;

DeviceManager.init();

// socket clients connected to the application
var _sockets = {'connection': null, url: null, sockets: {}};
// physical devices (arduinos) connected through
// serialport
var _devices = {};
// priority given to physical devices
var _priority = 0;

var writeToDevices = (devices, matrix) => {
  for (var id in devices)
    DeviceManager.writeMatrix(_devices[id], matrix);
};

var DeviceStore = assign({
  getDevicesState () {
    return {
      devices: _devices,
      priority: _priority,
      sockets: _sockets,
    };
  },

  dispatcherIndex: AppDispatcher.register((payload) => {
    var {action} = payload;

    switch (action.actionType) {
      case CONSTANTS.Device.EXPOSE_TO_LOCAL:
        _sockets.connection = SocketsManager.init().then((url) => {
          _sockets.url = url;
          DeviceStore.emitChange();
        }, (err) => {
          console.warn('An error arised on SocketsManager init: ', err);
        });

        DeviceStore.emitChange();
        break;

      case CONSTANTS.Device.ADD:
        _devices[action.device.pnpId] = action.device;
        DeviceStore.emitChange();
        break;

      case CONSTANTS.Device.REMOVE:
        if (!action.id)
          return console.warn('DeviceStore: Device.REMOVE without an ID');

        delete _devices[action.id];
        DeviceStore.emitChange();
        break;

      case CONSTANTS.Matrix.UPDATE:
        if (_priority !== 1)
          writeToDevices(_devices, action.matrix);
        break;

      case CONSTANTS.Matrix.UPDATE_EXTEND:
        if (_priority === 1)
          writeToDevices(_devices, action.matrix);
        break;

      case CONSTANTS.Device.SET_PRIORITY:
        _priority = action.priority;

        DeviceStore.emitChange();
        break;

      case CONSTANTS.Device.SOCKET_CONNECT:
        console.log('SOCKET CONNECTED!');
        console.log(action.socket);
        break;

      case CONSTANTS.Device.SOCKET_DISCONNECT:
        console.log('SOCKET DISONNECTED!');
        console.log(action.socket);
        break;
    }

    return true;
  })
}, Store);

module.exports = DeviceStore;
