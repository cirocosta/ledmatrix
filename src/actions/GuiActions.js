'use strict';

var CONSTANTS = require('../constants/Constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var GuiActions = {
  toggleMaximization () {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Gui.TOGGLE_MAXIMIZATION
    });
  }
};

module.exports = GuiActions;
