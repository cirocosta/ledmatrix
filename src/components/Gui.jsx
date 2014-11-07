/**
 * @jsx React.DOM
 */

require('./Gui.scss');

var React = require('react');
var gui = require('nw.gui');
var CONSTANTS = require('../constants');
var {AppStore} = require('../stores');
var {AppActions} = require('../actions');
var {storesGlueMixin} = require('../mixins');

var Gui = React.createClass({
  mixins: [storesGlueMixin(AppStore)],

  getStateFromStores: AppStore.getAppState,

  handleClick (e) {
    e && e.preventDefault();

    switch (e.target.dataset.name) {
      case 'dev':
        gui.Window.get().showDevTools();
        break;

      case 'min':
        gui.Window.get().minimize();
        break;

      case 'max':
        AppActions.toggleMaximization();
        break;

      case 'close':
        gui.Window.get().close();
        break;

      default:
        throw new Error(e.target.dataset.name + ' is not supported.');
    }
  },

  render () {
    return (
      <nav className="Gui">
        <ul>
          <li onClick={this.handleClick}
              data-name="dev"
              key={0}>
            dev
          </li>
          <li onClick={this.handleClick}
              data-name="min"
              key={1}>
            min
          </li>
          <li onClick={this.handleClick}
              data-name="max"
              key={2}>
              {this.state.maximized ? 'unmax': 'max'}
          </li>
          <li onClick={this.handleClick}
              data-name="close"
              key={3}>
            close
          </li>
        </ul>
      </nav>
    );
  }
});

module.exports = Gui;
