'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var gui = require('nw.gui');

var CHANGE_EVENT = 'change';
var MATRIX_SIZE = 10;
var _matrix = [];
var _windowState = {
  maximized: false,
};

for(var i=0; i<MATRIX_SIZE; i++) {
  _matrix[i] = [];
  for(var j=0; j<MATRIX_SIZE; j++) {
    _matrix[i].push(0);
  }
}

/**
 * Registers itself with AppDispatcher so that
 * we are going to receive action's painted
 * payload from the call of appdispatcher's
 * `dispatch` method.
 */

var ApplicationStore = merge(EventEmitter.prototype, {
  getMatrix: () => _matrix,

  getWindowState: () => _windowState,

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

    switch (action.actionType) {
      case "toggleMaximization":
        if(_windowState.maximized)
          gui.Window.get().unmaximize();
        else
          gui.Window.get().maximize();

        _windowState.maximized = !_windowState.maximized;
        ApplicationStore.emitChange();
      break;
    }

    return true;
  })
});


module.exports = ApplicationStore;
