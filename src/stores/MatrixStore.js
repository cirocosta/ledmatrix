/**
 * Holds state of the main datastructure of the
 * application: Matrices. This is exposed as an
 * array of matrices sorted by the priority that
 * they have in a given application.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Store = require('./Store');
var CONSTANTS = require('../constants');
var assign = require('object-assign');

var clone = (obj) => JSON.parse(JSON.stringify(obj));

var MATRIX_SIZE = 10;
var _INITIAL_MATRIX = [];
var _matrix;

/**
 * Populating the matrix
 */
for(var i = 0; i < MATRIX_SIZE; i++) {
  _INITIAL_MATRIX[i] = [];
  for(var j = 1; j < MATRIX_SIZE; j++) {
    _INITIAL_MATRIX[i].push(0);
  }
}

/**
 * Create a stateful _matrix, different object
 * from _INITIAL_MATRIX - never touched.
 */
_matrix = clone(_INITIAL_MATRIX);

/**
 * Registers itself with AppDispatcher so that
 * we are going to receive action's painted
 * payload from the call of appdispatcher's
 * `dispatch` method.
 */

var MatrixStore = assign({
  getMatrixState () {
    return {
      matrix: _matrix
    }
  },

  getInitialMatrix: () => _INITIAL_MATRIX,

  dispatcherIndex: AppDispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {
      case CONSTANTS.Matrix.RESET:
        _matrix = clone(_INITIAL_MATRIX);

        MatrixStore.emitChange();
        break;

      case CONSTANTS.Matrix.UPDATE:
        _matrix = action.matrix;

        MatrixStore.emitChange();
        break;

      case CONSTANTS.Matrix.ACTIVATE_CELL:
        var x = action.coordinates[1];
        var y = action.coordinates[0];

        if (action.onlyOne)
          _matrix = clone(_INITIAL_MATRIX);

        _matrix[x][y] = 1;

        MatrixStore.emitChange();
        break;
    }

    return true;
  })
}, Store);



module.exports = MatrixStore;
