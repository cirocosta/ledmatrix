/**
 * Holds the state and information regarding
 * Devices that may connect to the desktop
 * application.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var CONSTANTS = require('../constants');
var Store = require('./Store');
var MatrixStore = require('./MatrixStore');
var assign = require('object-assign');
var isEmpty = (obj) => obj ? !Object.keys(obj).length : true;
var DeviceManager = require('../utils/DeviceManager');

DeviceManager.init();

var _devices = {};

MatrixStore.addChangeListener(() => {
  if (isEmpty(_devices))
   return;

  for (var id in _devices)
    DeviceManager.writeMatrix(_devices[id], MatrixStore.getMatrixState().matrix);
});

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
    }

    return true;
  })
}, Store);

module.exports = DeviceStore;
