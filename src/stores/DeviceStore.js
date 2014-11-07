/**
 * Holds the state and information regarding
 * Devices that may connect to the desktop
 * application.
 */

 var AppDispatcher = require('../dispatcher/AppDispatcher');
 var CONSTANTS = require('../constants');
 var Store = require('./Store');
 var assign = require('object-assign');

__NODEWEBKIT__ && require('../utils/DeviceManager').init();

var _devices = {};

var DeviceStore = assign({
  getDevicesState () {
    return {
      devices: _devices
    }
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

      default:
        console.warn('DeviceStore: %s received but not handled', action.actionType);
    }

    return true;
  })
}, Store);

module.exports = DeviceStore;
