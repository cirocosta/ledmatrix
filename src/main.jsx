/**
 * Entry point for the application
 */

require('es6-promise').polyfill();
var React = require('react');
var Application = require('./components/Application.jsx');

React.render(
  <Application />,
  document.body
);

/**
 * Exposing a globan React so that, when running
 * in a browser we are able to use React dev
 * tools extension for debugging.
 */

window.React = React;
