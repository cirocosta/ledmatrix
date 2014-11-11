/**
 * Holds the state and information regarding
 * Devices that may connect to the desktop
 * application.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var DeviceManager = require('../utils/DeviceManager');
var CONSTANTS = require('../constants');
var GameStore = require('./GameStore');
var assign = require('object-assign');
var Store = require('./Store');

var isEmpty = (obj) => obj ? !Object.keys(obj).length : true;


DeviceManager.init();

var _devices = {};
var _priority = 0;

var writeToDevices = (devices, matrix) => {
  for (var id in devices)
    DeviceManager.writeMatrix(_devices[id], matrix);
};

var DeviceStore = assign({
  getDevicesState () {
    return {
      devices: _devices,
      priority: _priority
    };
  },

  dispatcherIndex: AppDispatcher.register((payload) => {
    var {action} = payload;

    switch (action.actionType) {
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
        console.log(action);
        if (_priority === 1)
          writeToDevices(_devices, action.matrix);
        break;

      case CONSTANTS.Device.SET_PRIORITY:
        _priority = action.priority;

        DeviceStore.emitChange();
        break;
    }

    return true;
  })
}, Store);

module.exports = DeviceStore;
