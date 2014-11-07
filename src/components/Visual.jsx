/**
 * @jsx React.DOM
 */

var React = require('react');

var {storesGlueMixin} = require('../mixins');
var {MatrixStore} = require('../stores');

var Visual = React.createClass({
  mixins: [storesGlueMixin(MatrixStore)],

  getStateFromStores: MatrixStore.getMatrixState,

  render () {
    return (
      <article>
        <h1>VISUAL</h1>
      </article>
    );
  }
});

module.exports = Visual;
