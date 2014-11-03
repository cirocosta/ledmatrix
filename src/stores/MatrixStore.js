'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CONSTANTS = require('../constants/Constants');
var merge = require('react/lib/merge');

var clone = (obj) => JSON.parse(JSON.stringify(obj));

var CHANGE_EVENT = 'change';
var MATRIX_SIZE = 10;
var _INITIAL_MATRIX = [];
var _matrix;
var _manager = CONSTANTS.Matrix.CLICK_MANAGER;
var _devices = [];

/**
 * Converts a number to a fixed length
 * hexadecimal string.
 */
var intToFixedHex = function (num, size) {
  var res = Number(num).toString(16);

  while (res.length < size)
    res = '0' + res;

  return res;
};

/**
 * Converts a matrix to a fixed length string of
 * hex decimal values.
 */
var matrixToHex = (matrix) => {
  var N = matrix.length;
  var repr = [];

  for (var i = 0; i < N; i++)
    repr.push(intToFixedHex(parseInt(matrix[i].join(''), 2), 3));

  return repr.join('');
}

/**
 * Populating the matrix
 */
for(var i=0; i<MATRIX_SIZE; i++) {
  _INITIAL_MATRIX[i] = [];
  for(var j=0; j<MATRIX_SIZE; j++) {
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

var MatrixStore = merge(EventEmitter.prototype, {
  getMatrix: () => _matrix,

  getInitialMatrix: () => _INITIAL_MATRIX,

  emitChange () {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener (cb) {
    this.on(CHANGE_EVENT, cb);
  },

  removeChangeListener (cb) {
    this.removeListener(CHANGE_EVENT, cb);
  },

  dispatcherIndex: AppDispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {
      case CONSTANTS.Matrix.UPDATE:
        _matrix = action.matrix.matrix;
        var repr = matrixToHex(_matrix);

        console.log(repr);

        if (_devices.length)
          _devices.forEach((device) => {
            device.write(repr);
          });

        MatrixStore.emitChange();
        break;

      case CONSTANTS.Settings.ADD_DEVICE:
        _devices.push(action.device);
        MatrixStore.emitChange();
        break;

      case CONSTANTS.Settings.REMOVE_DEVICE:
        delete _devices[payload.id];
        MatrixStore.emitChange();
        break;
    }

    return true;
  })
});



module.exports = MatrixStore;
