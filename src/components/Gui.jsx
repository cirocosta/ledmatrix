/**
 * @jsx React.DOM
 */

'use strict';

require('./Gui.scss');

var React = require('react');
var ApplicationActions = require('../actions/ApplicationActions.js');
var gui = require('nw.gui');

var Gui = React.createClass({
  propTypes: {
    windowState: React.PropTypes.object.isRequired
  },
  handleClick (e) {
    e && e.preventDefault();
    switch (e.target.dataset.name) {
      case 'min':
        gui.Window.get().minimize();
      break;

      case 'max':
        ApplicationActions.toggleMaximization();
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
              data-name="min"
              key={1}>
            min
          </li>
          <li onClick={this.handleClick}
              data-name="max"
              key={2}>
              {this.props.windowState.maximized ? 'unmax': 'max'}
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
