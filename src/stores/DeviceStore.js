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

// info about sockets connection
var _sockets = {'connection': null, url: null};
// physical devices (arduinos) connected through
// serialport as well as socket connections.
var _devices = {};

var _writeToDevices = (devices, matrix, priority) => {
  for (var id in devices)
    if (_devices[id].priority === priority)
      DeviceManager.writeMatrix(_devices[id], matrix);
};


var DeviceStore = assign({
  getDevicesState () {
    return {
      devices: _devices,
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
        _devices[action.device.id] = action.device;
        _devices[action.device.id].priority = 0;
        DeviceStore.emitChange();
        break;

      case CONSTANTS.Device.REMOVE:
        if (!action.id)
          return console.warn('DeviceStore: Device.REMOVE without an ID');

        delete _devices[action.id];
        DeviceStore.emitChange();
        break;

      case CONSTANTS.Device.TOGGLE_PRIORITY:
        _devices[action.id].priority = +!_devices[action.id].priority;

        DeviceStore.emitChange();
        break;

      /**
       * Intercepting Matrix Events
       */

      case CONSTANTS.Matrix.UPDATE:
        _writeToDevices(_devices, action.matrix, 0);
        break;

      case CONSTANTS.Matrix.UPDATE_EXTEND:
        _writeToDevices(_devices, action.matrix, 1);
        break;
    }

    return true;
  })
}, Store);

module.exports = DeviceStore;
