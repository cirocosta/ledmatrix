'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';
var _matrix = [];

/**
 * Registers itself with AppDispatcher so that
 * we are going to receive action's painted
 * payload from the call of appdispatcher's
 * `dispatch` method.
 */

var MatrixStore = merge(EventEmitter.prototype, {
  getMatrix () {
    return _matrix;
  },

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
    var matrix;

    // switch (action.actionType) {
    //   case MatrixConstants.MATRIX_CREATE:

    // }

    return true;
  });
});


module.exports = MatrixStore;
