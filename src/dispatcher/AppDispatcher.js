'use strict';

var Dispatcher = require('./Dispatcher');
var CONSTANTS = require('../constants');
var merge = require('react/lib/merge');

/**
 * Bridge function between the views (which will
 * be generating some actions) and the
 * dispatcher, 'painting' the action as a
 * 'VIEW_ACTION' so that whoever will receive
 * the payload will know how to deal with this
 * kind of action.
 */
var AppDispatcher = merge(Dispatcher.prototype, {
  handleViewAction (action) {
    this.dispatch({
      source: CONSTANTS.VIEW_ACTION,
      action: action
    });
  },

  handleDeviceAction (action) {
    this.dispatch({
      source: CONSTANTS.DEVICE_ACTION,
      action: action
    });
  }
});

module.exports = AppDispatcher;
