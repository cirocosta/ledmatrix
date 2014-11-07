/**
 * @jsx React.DOM
 */

/**
 * Entry point for the application
 */

var React = require('react');
var Application = require('./components/Application.jsx');

React.renderComponent(
  <Application />,
  document.body
);

/**
 * Exposing a globan React so that, when running
 * in a browser we are able to use React dev
 * tools extension for debugging.
 */

window.React = React;
