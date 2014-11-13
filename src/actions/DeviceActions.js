var CONSTANTS = require('../constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var DeviceActions = {
  /**
   * Arduino
   */

  addDevice (device) {
    AppDispatcher.handleDeviceAction({
      actionType: CONSTANTS.Device.ADD,
      device: device
    });
  },

  removeDevice (id) {
    AppDispatcher.handleDeviceAction({
      actionType: CONSTANTS.Device.REMOVE,
      id: id
    });
  },

  togglePriority (id) {
    AppDispatcher.handleDeviceAction({
      actionType: CONSTANTS.Device.TOGGLE_PRIORITY,
      id: id
    });
  },

  /**
   * Sockets
   */

  exposeToLocal () {
    AppDispatcher.handleDeviceAction({
      actionType: CONSTANTS.Device.EXPOSE_TO_LOCAL
    });
  },
};

module.exports = DeviceActions;
