var CONSTANTS = require('../constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var DeviceActions = {
  addDevice (device) {
    AppDispatcher.handleDeviceAction({
      actionType: CONSTANTS.Device.ADD,
      device: device.device
    });
  },

  removeDevice (id) {
    AppDispatcher.handleDeviceAction({
      actionType: CONSTANTS.Device.REMOVE,
      id: id
    });
  },

  setPriority (priority) {
    AppDispatcher.handleDeviceAction({
      actionType: CONSTANTS.Device.SET_PRIORITY,
      priority: priority
    });
  },
};

module.exports = DeviceActions;
