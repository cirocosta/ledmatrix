'use strict';

var CONSTANTS = require('../constants/Constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var SettingsActions = {
  addDevice (device) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Settings.ADD_DEVICE,
      device: device
    });
  },

  removeDevice (id) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Settings.REMOVE_DEVICE,
      id: id
    });
  },

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
  }
};

module.exports = SettingsActions;
