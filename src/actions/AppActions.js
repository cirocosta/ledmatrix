var CONSTANTS = require('../constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var AppActions = {
  toggleMaximization () {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.App.TOGGLE_MAXIMIZATION
    });
  }
};

module.exports = AppActions;
