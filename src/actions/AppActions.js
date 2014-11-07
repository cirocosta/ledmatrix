var CONSTANTS = require('../constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var AppActions = {
  toggleMaximization () {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.App.TOGGLE_MAXIMIZATION
    });
  },

  changeVisualization (type) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.App.CHANGE_VISUALIZATION,
      type: type
    });
  },

  changeMatrixManager (who) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.App.CHANGE_MATRIX_MANAGER,
      who: who
    });
  },
};

module.exports = AppActions;
