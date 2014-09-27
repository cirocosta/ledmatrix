/**
 * @jsx React.DOM
 */

'use strict';

require('./Application.scss');

var React = require('react');
var Main = require('./Main.jsx');
var AppStore = require('../stores/AppStore');
var Gui = process.env.NODE_ENV !== 'web' ?
  require('./Gui.jsx') :
  null;

var getApplicationState = () => {
  return {
    windowState: AppStore.getWindowState()
  };
};

var Application = React.createClass({
  getInitialState: () => getApplicationState(),

  componentDidMount () {
    AppStore.addChangeListener(this.handleChange);
  },

  componentWillUnmount () {
    AppStore.removeChangeListener(this.handleChange);
  },

  handleChange () {
    this.setState(getApplicationState());
  },

  render () {
    return (
      <div>
        <Gui windowState={this.state.windowState} />
        <Main />
      </div>
    );
  }
});

module.exports = Application;
