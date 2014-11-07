/**
 * Holds application level state and other
 * more general things related to the whole UI.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var Store = require('./Store');
var CONSTANTS = require('../constants');
var assign = require('object-assign');

var gui = process.env.NODE_ENV !== 'web' ?
  require('nw.gui') :
  function () {};

var _appState = {
  maximized: false,
};


/**
 * Registers itself with AppDispatcher so that
 * we are going to receive action's painted
 * payload from the call of appdispatcher's
 * `dispatch` method.
 */

var AppStore = assign({
  getAppState: () => _appState,

  dispatcherIndex: AppDispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {
      case CONSTANTS.App.TOGGLE_MAXIMIZATION:
        if (_appState.maximized)
          gui.Window.get().unmaximize();
        else
          gui.Window.get().maximize();

        _appState.maximized = !_appState.maximized;
        AppStore.emitChange();
        break;
    }

    return true;
  })
}, Store);


module.exports = AppStore;
