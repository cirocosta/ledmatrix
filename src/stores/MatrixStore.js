/**
 * Holds state of the main datastructure of the
 * application: Matrices. This is exposed as an
 * array of matrices sorted by the priority that
 * they have in a given application.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Store = require('./Store');
var {MatrixActions} = require('../actions');
var CONSTANTS = require('../constants');
var assign = require('object-assign');

var clone = (obj) => JSON.parse(JSON.stringify(obj));

var _INITIAL_MATRIX = [
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0],
];

var _matrices = [
  clone(_INITIAL_MATRIX),
];

var MatrixStore = assign({
  getMatricesState () {
    return {
      matrices: _matrices
    }
  },

  dispatcherIndex: AppDispatcher.register((payload) => {
    var {action} = payload;

    switch (action.actionType) {
      case CONSTANTS.Matrix.UPDATE:
        _matrices[0] = action.matrix;

        MatrixStore.emitChange();
        break;

      case CONSTANTS.Matrix.UPDATE_EXTEND:
        _matrices[1] = action.matrix;

        MatrixStore.emitChange();
        break;

      case CONSTANTS.Matrix.RESET:
        var matrix = clone(_INITIAL_MATRIX);

        MatrixActions.updateMatrix(matrix);
        break;

      case CONSTANTS.Matrix.ACTIVATE_CELL:
        var matrix = clone(_matrices[0]);
        var x = action.coordinates[1];
        var y = action.coordinates[0];

        if (action.onlyOne)
          matrix = clone(_INITIAL_MATRIX);

        matrix[x][y] = +!matrix[x][y];

        MatrixActions.updateMatrix(matrix);
        break;
    }

    return true;
  })
}, Store);



module.exports = MatrixStore;
