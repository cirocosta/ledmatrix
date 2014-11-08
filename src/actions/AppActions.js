var CONSTANTS = require('../constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var AppActions = {
  toggleMaximization () {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.App.TOGGLE_MAXIMIZATION
    });
  },

  changeMatrixVis (type) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.App.CHANGE_VIS,
      type: type
    });
  },

  changeMatrixCtrl (type) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.App.CHANGE_CTRL,
      type: type
    });
  },
};

module.exports = AppActions;
