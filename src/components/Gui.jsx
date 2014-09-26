/**
 * @jsx React.DOM
 */

'use strict';

require('./Gui.scss');

var React = require('react');
var ApplicationActions = require('../actions/ApplicationActions.js');

var Gui = React.createClass({
  propTypes: {
    windowState: React.PropTypes.object.isRequired
  },
  handleClick (e) {
    e && e.preventDefault();
    switch (e.target.dataset.name) {
      case 'min':
        guiWindow.minimize();
      break;

      case 'max':
        ApplicationActions.toggleMaximization();
      break;

      case 'close':
        guiWindow.close();
      break;

      default:
      throw new Error(e.target.dataset + ' is not supported.');
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
            max
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
