/**
 * @jsx React.DOM
 */

'use strict';

require('./Application.scss');

var React = require('react');
var Main = require('./Main.jsx');
var ApplicationStore = require('../stores/ApplicationStore.jsx');
var Gui = process.env.NODE_ENV !== 'web' ?
  require('./Gui.jsx') :
  null;

var getApplicationState = function(){
  return {
    matrix: ApplicationStore.getMatrix(),
    windowState: ApplicationStore.getWindowState()
  };
};

var Application = React.createClass({
  getInitialState (){
    return getApplicationState();
  },

  componentDidMount () {
    ApplicationStore.addChangeListener(this._onChange);
  },

  componentWillUnmount () {
    ApplicationStore.removeChangeListener(this._onChange);
  },

  render () {
    return (
      <div>
        <Gui windowState={this.state.windowState} />
        <Main matrix={this.state.matrix} />
      </div>
    );
  },

  _onChange () {
    this.setState(getApplicationState());
  }
});

module.exports = Application;
