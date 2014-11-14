require('./Device.scss');
var React = require('react');
var {storesGlueMixin} = require('../mixins');
var {DeviceStore} = require('../stores');
var {DeviceActions} = require('../actions');

var Device = React.createClass({
  propTypes: {
    deviceId: React.PropTypes.string.isRequired,
  },

  mixins: [storesGlueMixin(DeviceStore)],

  getStateFromStores: DeviceStore.getDevicesState,

  handleClick (e) {
    DeviceActions.togglePriority(this.props.deviceId);
  },

  render () {
    var device = this.state.devices[this.props.deviceId];
    var labelType = <span className="label__type">{device.type}</span>;
    var labelPriority = device.type === 'vis' ?
      <span className="label__priority">{device.priority}</span> :
      null;

    return (
      <p className="Device" onClick={this.handleClick}>
        {this.props.deviceId.substring(0, 11)}
        {labelType}
        {labelPriority}
      </p>
    );
  }
});

module.exports = Device;
