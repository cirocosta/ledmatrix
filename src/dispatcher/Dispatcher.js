'use strict';

/**
 * The dispatcher is the central hun that will
 * manage all of the data flow in an application
 * that relies on Flux structure. It is a kind
 * of registry of callbacks that stores provide.
 *
 * Whenever an action is received by the
 * dispatcher, the `dispatch` method will be
 * fired and will then notify and send actions's
 * payload to all of the stores that registered
 * a callback.
 */

var merge = require('react/lib/merge');

var _callbacks = [];
var _promises = [];

/**
 * Create the base Dispatcher, which will
 * provide some methods that our more specific
 * one will use.
 */
var Dispatcher = function () {};

// This is what we'd do in ES6 with
// Object.assign(ClassName.prototype, {stuff}).
Dispatcher.prototype = merge(Dispatcher.prototype, {
  /**
   * Register's the Store's callback function to
   * be called whenever an action happens so
   * that the dispatcher sends the aciton's
   * payload to all of the stores, which then
   * filters this emission. Will be used by our
   * stores lately.
   */
  register (callback) {
    _callbacks.push(callback);

    return _callbacks.length - 1;
  },

  /**
   * Now we implement the dispatch method, which
   * will be called whenever an action comes.
   * This will fire all the callbacks that were
   * registered. This is going to be used within
   * the actions to trigger the invocation of
   * the registered callbacks.
   */
  dispatch (payload) {
    var resolves = [];
    var rejects = [];

    _promises = _callbacks.map((_, i) =>
      new Promise((resolve, reject) => {
        resolves[i] = resolve;
        rejects[i] = reject;
      })
    );

    // after we created the promises we can then
    // actually dispatch to callbacks and
    // resolve/reject promises.
    _callbacks.forEach((callback, i) => {
      Promise.resolve(callback(payload)).then(() => {
        resolves[i](payload);
      }, () => {
        rejects[i](new Error(''));
      });
    });

    _promises = [];
  }
});

module.exports = Dispatcher;
