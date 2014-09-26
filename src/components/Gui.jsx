/**
 * @jsx React.DOM
 */

'use strict';

require('./Gui.scss');

var React = require('react');
var gui = require('nw.gui');

var Gui = React.createClass({
  handleClick (e) {
    e && e.preventDefault();

    switch (e.target.dataset) {
      case 'min':

      break;

      case 'max':
      break;

      case 'close':
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
