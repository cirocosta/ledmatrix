require('./Device.scss');
var React = require('react');
var {storesGlueMixin} = require('../mixins');
var {DeviceStore} = require('../stores');
var {DeviceActions} = require('../actions');

var Device = React.createClass({
  propTypes: {
    pnpId: React.PropTypes.string.isRequired
  },

  mixins: [storesGlueMixin(DeviceStore)],

  getStateFromStores: DeviceStore.getDevicesState,

  handleCheck (e) {
    DeviceActions.setPriority(e.target.checked ? 1 : 0);
  },

  render () {
    return (
      <div className='Device'>
        <p>{this.props.pnpId.substring(0, 11)}</p>
        <label>Use as Extension</label>
        <input type="checkbox"
               checked={this.state.priority === 1}
               onChange={this.handleCheck} />
      </div>
    );
  }
});

module.exports = Device;
