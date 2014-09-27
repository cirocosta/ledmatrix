/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Application = require('./components/Application.jsx');

React.renderComponent(
  <Application />,
  document.body
);

window.React = React;
