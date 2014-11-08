var CONSTANTS = require('../constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var MatrixActions = {
  updateMatrix (matrix) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Matrix.UPDATE,
      matrix: matrix
    });
  },

  activateCell (coordinates, onlyOne) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Matrix.ACTIVATE_CELL,
      coordinates: coordinates,
      onlyOne: onlyOne
    });
  },
};

module.exports = MatrixActions;
