/**
 * @jsx React.DOM
 */

'use strict';

require('./Settings.scss');

var React = require('react');
var SettingsStore = require('../stores/SettingsStore');
var CONSTANTS = require('../constants/Constants');
var Actions = require('../actions/Actions');

var Settings = React.createClass({
  getInitialState: () => SettingsStore.getSettingsState(),

  handleClick (e) {
    switch (e.target.dataset.name) {
      case 'snake':
      Actions.Settings.changeMatrixManager(CONSTANTS.Settings.SNAKE);
      break;

      case 'click':
      Actions.Settings.changeMatrixManager(CONSTANTS.Settings.CLICK);
      break;

      case 'pre':
      Actions.Settings.changeVisualization(CONSTANTS.Settings.TYPE_PRE_MATRIX);
      break;

      case 'matrix':
      Actions.Settings.changeVisualization(CONSTANTS.Settings.TYPE_REACT_MATRIX);
      break;
    }
  },

  componentDidMount () {
    SettingsStore.addChangeListener(this.handleChange);
  },

  componentDidUnmount () {
    SettingsStore.removeChangeListener(this.handleChange);
  },

  handleChange () {
    this.setState(SettingsStore.getSettingsState());
  },

  render () {
    var vis = this.state.visualization !== CONSTANTS.Settings.TYPE_PRE_MATRIX ?
      <li key={4} data-name="pre" onClick={this.handleClick}>Pre</li> :
      <li key={4} data-name="matrix" onClick={this.handleClick}>Matrix</li>;

    var devices = !this.state.devices.length ?
      <li>No devices</li> :
      this.state.devices.map((device, i) => <li key={i*10}>Device {i}</li>);

    return (
      <ul className="Settings">
        <li key={1}
            data-name="devices">
          Devices
          <ul className="devices">
            {devices}
          </ul>
        </li>
        <li key={2}
            data-name="snake"
            onClick={this.handleClick}>
          Snake Game</li>
        <li key={3}
            data-name="click"
            onClick={this.handleClick}>
          Click</li>
        {vis}
      </ul>
    );
  }
});

module.exports = Settings;
