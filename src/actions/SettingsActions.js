'use strict';

var CONSTANTS = require('../constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var SettingsActions = {
  /**
   * Device specific
   */

  addDevice (device) {
    AppDispatcher.handleDeviceAction({
      actionType: CONSTANTS.Settings.ADD_DEVICE,
      device: device.device
    });
  },

  removeDevice (id) {
    AppDispatcher.handleDeviceAction({
      actionType: CONSTANTS.Settings.REMOVE_DEVICE,
      id: id
    });
  },

  /**
   * View specific
   */

  changeVisualization (type) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Settings.CHANGE_VISUALIZATION,
      type: type
    });
  },

  changeMatrixManager (who) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Settings.CHANGE_MATRIX_MANAGER,
      who: who
    });
  },
};

module.exports = SettingsActions;
