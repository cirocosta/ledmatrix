require('./Settings.scss');

var React = require('react');
var CONSTANTS = require('../constants');
var cx = require('../utils/cx');
var Device = require('./Device.jsx');
var {storesGlueMixin} = require('../mixins');
var {AppStore, DeviceStore} = require('../stores');
var {AppActions, DeviceActions} = require('../actions');
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

      case 'vis-pre':
      AppActions.changeMatrixVis(CONSTANTS.App.VIS_PRE);
      break;

      case 'vis-react-matrix':
      AppActions.changeMatrixVis(CONSTANTS.App.VIS_REACT_MATRIX);
      break;
    }
  },

  handleExposeToLocal () {
    if (!this.state.connection)
      return DeviceActions.exposeToLocal();
  },

  _getDevices () {
    var ids = Object.keys(this.state.devices);
    var devicesElem = ids.length ?
      ids.map((id, i) => <li key={i}><Device deviceId={id} type='vis' /></li>) :
      <li>0 Arduinos</li>;

    return devicesElem;
  },

  render () {
    var devices = this._getDevices();
    var socketsText = !this.state.sockets.connection ?
      'Expose to Local' :
      this.state.sockets.url;

    return (
      <article className="Settings">
        <h1>SETTINGS</h1>
        <details>
          <summary>Devices</summary>
          <ul>
            {devices}
          </ul>
          <button onClick={this.handleExposeToLocal}>
            {socketsText}
          </button>
        </details>

        <details>
          <summary>Visualization</summary>
          <p className='details'>Change what is the current visualization</p>
          <ul>
            <li key={1}>
              <button className={cx({active: this.state.vis === CONSTANTS.App.VIS_REACT_MATRIX})}
                      onClick={this.handleClick}
                      data-name='vis-react-matrix'>
                React-Matrix
              </button>
            </li>
            <li key={2}>
              <button className={cx({active: this.state.vis === CONSTANTS.App.VIS_PRE})}
                      onClick={this.handleClick} data-name='vis-pre'>
                Pre
              </button>
            </li>
          </ul>
        </details>

        <details>
          <summary>Control</summary>
          <p className='details'>Define what is going to control the matrix</p>
          <ul>
            <li key={11}>
              <button className={cx({active: this.state.ctrl === CONSTANTS.App.CTRL_CLICK})}
                      onClick={this.handleClick} data-name='ctrl-click'>
                Click
              </button>
            </li>
            <li key={13}>
              <button className={cx({active: this.state.ctrl === CONSTANTS.App.CTRL_SNAKE})}
                      onClick={this.handleClick} data-name='ctrl-snake'>
                Snake Game
              </button>
            </li>
          </ul>
        </details>
      </article>
    );
  }
});

module.exports = Settings;
