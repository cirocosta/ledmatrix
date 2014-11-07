/**
 * @jsx React.DOM
 */

require('./PreMatrix.scss');

var React = require('react');

var prettyMatrix = (arr) => {
  var repr = [];

  for (var i in arr)
    repr.push(arr[i])

  return repr.join('\n');
};

var PreMatrix = React.createClass({
  propTypes: {
    matrix: React.PropTypes.array.isRequired
  },

  render () {
    return (
      <pre className="PreMatrix">{prettyMatrix(this.props.matrix)}</pre>
    );
  }
});

module.exports = PreMatrix;
