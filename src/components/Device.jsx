require('./Device.scss');
var React = require('react');
var {storesGlueMixin} = require('../mixins');
var {DeviceStore} = require('../stores');
var {DeviceActions} = require('../actions');

var Device = React.createClass({
  propTypes: {
    deviceId: React.PropTypes.string.isRequired,
    type: React.PropTypes.oneOf(['vis', 'ctrl']).isRequired
  },

  mixins: [storesGlueMixin(DeviceStore)],

  getStateFromStores: DeviceStore.getDevicesState,

  handleCheck (e) {
    DeviceActions.setPriority(e.target.checked ? 1 : 0);
  },

  render () {
    return (
      <div className='Device'>
        <p>{this.props.deviceId.substring(0, 11)}</p>
        <label>Use as Extension</label>
        <input type="checkbox"
               checked={this.state.priority === 1}
               onChange={this.handleCheck} />
      </div>
    );
  }
});

module.exports = Device;
