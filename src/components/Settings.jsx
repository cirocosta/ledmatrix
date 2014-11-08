/**
 * @jsx React.DOM
 */

require('./Settings.scss');

var React = require('react');
var CONSTANTS = require('../constants');
var cx = require('../utils/cx');
var {storesGlueMixin} = require('../mixins');
var {AppStore, DeviceStore} = require('../stores');
var {AppActions} = require('../actions');
var assign = require('object-assign');

var Settings = React.createClass({
  mixins: [storesGlueMixin(AppStore, DeviceStore)],

  // TODO do a better thing for this ...
  getStateFromStores () {
    return assign({}, AppStore.getAppState(), DeviceStore.getDevicesState());
  },

  handleClick (e) {
    switch (e.target.dataset.name) {
      case 'ctrl-snake':
      AppActions.changeMatrixCtrl(CONSTANTS.App.CTRL_SNAKE);
      break;

      case 'ctrl-click':
      AppActions.changeMatrixCtrl(CONSTANTS.App.CTRL_CLICK);
      break;

      case 'ctrl-drag':
      AppActions.changeMatrixCtrl(CONSTANTS.App.CTRL_DRAG);
      break;

      case 'vis-pre':
      AppActions.changeMatrixVis(CONSTANTS.App.VIS_PRE);
      break;

      case 'vis-react-matrix':
      AppActions.changeMatrixVis(CONSTANTS.App.VIS_REACT_MATRIX);
      break;
    }
  },

  _getDevices () {
    var ids = Object.keys(this.state.devices);
    var devicesElem = ids.length ?
      ids.map((id, i) => <li className='device' key={i}>{id}</li>) :
      <li>No Devices :(</li>;

    return devicesElem;
  },

  render () {
    var devices = this._getDevices();

    return (
      <article className="Settings">
        <h1>SETTINGS</h1>
        <p>Devices connected:</p>
        <ul>
          {devices}
        </ul>

        <section>
          <h2>Visualization</h2>
          <p>Change what is the current visualization</p>
          <ul>
            <li className={cx({active: this.state.vis === CONSTANTS.App.VIS_REACT_MATRIX})}
                onClick={this.handleClick} data-name='vis-react-matrix'
                key={1}>React-Matrix</li>
            <li className={cx({active: this.state.vis === CONSTANTS.App.VIS_PRE})}
                onClick={this.handleClick} data-name='vis-pre'
                key={2}>Pre</li>
          </ul>
        </section>

        <section>
          <h2>Control</h2>
          <p>Define what is going to control the matrix</p>
          <ul>
            <li className={cx({active: this.state.ctrl === CONSTANTS.App.CTRL_CLICK})}
                onClick={this.handleClick} data-name='ctrl-click'
                key={11}>Click</li>
            <li className={cx({active: this.state.ctrl === CONSTANTS.App.CTRL_DRAG})}
                onClick={this.handleClick} data-name='ctrl-drag'
                key={12}>Drag</li>
            <li className={cx({active: this.state.ctrl === CONSTANTS.App.CTRL_SNAKE})}
                onClick={this.handleClick} data-name='ctrl-snake'
                key={13}>Snake Game</li>
          </ul>
        </section>
      </article>
    );
  }
});

module.exports = Settings;
