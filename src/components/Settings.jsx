/**
 * @jsx React.DOM
 */

require('./Settings.scss');

var React = require('react');
var CONSTANTS = require('../constants');
var {storesGlueMixin} = require('../mixins');
var {AppStore} = require('../stores');
var {AppActions} = require('../actions');

var Settings = React.createClass({
  mixins: [storesGlueMixin(AppStore)],

  getStateFromStores: AppStore.getAppState,

  handleClick (e) {
    switch (e.target.dataset.name) {
      case 'snake':
      AppActions.changeMatrixController(CONSTANTS.App.CONTROLLER_CLICK);
      break;

      case 'click':
      AppActions.changeMatrixController(CONSTANTS.App.CONTROLLER_SNAKE);
      break;

      case 'pre':
      AppActions.changeVisualization(CONSTANTS.App.VISUALIZATION_PRE_MATRIX);
      break;

      case 'matrix':
      AppActions.changeVisualization(CONSTANTS.App.VISUALIZATION_REACT_MATRIX);
      break;
    }
  },

  render () {
    // var vis = this.state.visualization !== CONSTANTS.App.VISUALIZATION_PRE_MATRIX ?
    //   <li key={4} data-name="pre" onClick={this.handleClick}>Pre</li> :
    //   <li key={4} data-name="matrix" onClick={this.handleClick}>Matrix</li>;

    // var devices = !this.state.devices.length ?
    //   <li>No devices</li> :
    //   this.state.devices.map((device, i) => <li key={i*10}>Device {i}</li>);

    return (
      <article className="Settings">
        <h1>SETTINGS</h1>
        <p>Device connected: <span>Device ID</span></p>

        <section>
          <h2>Visualization</h2>
          <p>Change what is the current visualization</p>
          <ul>
            <li onClick={this.handleVisClick} data-name='react-matrix'
                key={1}>React-Matrix</li>
            <li onClick={this.handleVisClick} data-name='pre'
                key={2}>Pre</li>
          </ul>
        </section>

        <section>
          <h2>Control</h2>
          <p>Define what is going to control the matrix</p>
          <ul>
            <li onClick={this.handleControlClick} data-name='click'
                key={11}>Click</li>
            <li onClick={this.handleControlClick} data-name='drag'
                key={12}>Drag</li>
            <li onClick={this.handleControlClick} data-name='snake'
                key={13}>Snake Game</li>
          </ul>
        </section>
      </article>
    );
  }
});

module.exports = Settings;
