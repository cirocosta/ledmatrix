'use strict';

var CONSTANTS = require('../constants/Constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var MatrixActions = {
  updateMatrix (matrix) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Matrix.UPDATE,
      matrix: matrix
    });
  }
};

module.exports = MatrixActions;
