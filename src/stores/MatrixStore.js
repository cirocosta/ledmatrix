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

for(var i=0; i<MATRIX_SIZE; i++) {
  _INITIAL_MATRIX[i] = [];
  for(var j=0; j<MATRIX_SIZE; j++) {
    _INITIAL_MATRIX[i].push(0);
  }
}

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
        MatrixStore.emitChange();
        break;
    }

    return true;
  })
});


module.exports = MatrixStore;
