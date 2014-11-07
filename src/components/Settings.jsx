/**
 * @jsx React.DOM
 */

require('./Settings.scss');

var React = require('react');
var CONSTANTS = require('../constants');
var {storesGlueMixin} = require('../mixins');
var {AppStore, DeviceStore} = require('../stores');
var {AppActions} = require('../actions');
var assign = require('object-assign');

console.log(require('../stores'));

var Settings = React.createClass({
  mixins: [storesGlueMixin(AppStore, DeviceStore)],

  // TODO do a better thing for this ...
  getStateFromStores () {
    return assign({}, AppStore.getAppState(), DeviceStore.getDevicesState());
  },

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

  _getDevices () {
    var ids = Object.keys(this.state.devices);
    var devicesElem = ids.length ?
      ids.map((id, i) => <li key={i}>{id}</li>) :
      <li>No Devices :(</li>;

    return devicesElem;
  },

  render () {
    // var vis = this.state.visualization !== CONSTANTS.App.VISUALIZATION_PRE_MATRIX ?
    //   <li key={4} data-name="pre" onClick={this.handleClick}>Pre</li> :
    //   <li key={4} data-name="matrix" onClick={this.handleClick}>Matrix</li>;

    console.log(this.state);

    return (
      <article className="Settings">
        <h1>SETTINGS</h1>
        <p>Devices connected:</p>
        <ul>
          {this._getDevices()}
        </ul>

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
