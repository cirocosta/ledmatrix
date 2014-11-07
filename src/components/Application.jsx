/**
 * @jsx React.DOM
 */

'use strict';

require('./Application.scss');

var React = require('react');
var Main = require('./Main.jsx');
var Gui = process.env.NODE_ENV !== 'web' ?
  require('./Gui.jsx') :
  null;

var Application = React.createClass({
  render () {
    var gui = Gui ?
      <Gui /> :
      null;

    return (
      <div>
        {gui}
        <Main />
      </div>
    );
  }
});

module.exports = Application;
