var GeneralConstants = require('../constants/GeneralConstants');
var Dispatcher = require('./Dispatcher');
var assign = require('object-assign');

/**
 * Bridge function between the views (which will
 * be generating some actions) and the
 * dispatcher, 'painting' the action as a
 * 'VIEW_ACTION' so that whoever will receive
 * the payload will know how to deal with this
 * kind of action.
 */
var AppDispatcher = assign({
  handleViewAction (action) {
    this.dispatch({
      source: GeneralConstants.VIEW_ACTION,
      action: action
    });
  },

  handleDeviceAction (action) {
    this.dispatch({
      source: GeneralConstants.DEVICE_ACTION,
      action: action
    });
  }
}, Dispatcher.prototype);

module.exports = AppDispatcher;
