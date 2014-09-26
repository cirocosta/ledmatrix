'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var merge = require('react/lib/merge');
var gui = require('nw.gui');

var CHANGE_EVENT = 'change';
var _matrix = [];
var _windowState = {
  maximized: false,
};

/**
 * Registers itself with AppDispatcher so that
 * we are going to receive action's painted
 * payload from the call of appdispatcher's
 * `dispatch` method.
 */

var ApplicationStore = merge(EventEmitter.prototype, {
  getMatrix () {
    return _matrix;
  },

  getWindowState () {
    return _windowState;
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

    switch (action.actionType) {
      case "toggleMaximization":
        if(_windowState.maximized){;
          gui.Window.get().unmaximize();
        }else{
          gui.Window.get().maximize();
        }
        _windowState.maximized = !_windowState.maximized;
        ApplicationStore.emitChange();
    }

    return true;
  })
});


module.exports = ApplicationStore;
