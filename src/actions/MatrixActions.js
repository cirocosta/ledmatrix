'use strict';

var CONSTANTS = require('../constants');
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
