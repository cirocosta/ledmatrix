'use strict';

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var CONSTANTS = require('../constants/Constants');
var merge = require('react/lib/merge');

var CHANGE_EVENT = 'change';
var _settings = {
  devices: [],
  visualization: CONSTANTS.Settings.TYPE_REACT_MATRIX,
  matrixManager: CONSTANTS.Settings.CLICK
};

/**
 * Registers itself with AppDispatcher so that
 * we are going to receive action's painted
 * payload from the call of appdispatcher's
 * `dispatch` method.
 */

var SettingsStore = merge(EventEmitter.prototype, {
  getSettingsState: () => _settings,

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
      case CONSTANTS.Settings.ADD_DEVICE:
        _settings.devices.push(payload.device);
        SettingsStore.emitChange();

        break;

      case CONSTANTS.Settings.REMOVE_DEVICE:
        delete _settings.devices[payload.id];
        SettingsStore.emitChange();

        break;

      case CONSTANTS.Settings.CHANGE_VISUALIZATION:
        _settings.visualization = action.type;
        SettingsStore.emitChange();

      case CONSTANTS.Settings.CHANGE_MATRIX_MANAGER:
        _settings.matrixManager = action.who;
        SettingsStore.emitChange();
    }

    return true;
  })
});


module.exports = SettingsStore;
