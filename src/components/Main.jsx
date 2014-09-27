/**
 * @jsx React.DOM
 */

'use strict';

require('./Main.scss');
require('react-matrix/dist/react-matrix.css');

var React = require('react/addons');
var Matrix = require('react-matrix/dist/react-matrix.js');
var Actions = require('../actions/Actions');
var MatrixStore = require('../stores/MatrixStore');

var update = React.addons.update;

var getState = () => {
  var matrix = MatrixStore.getMatrix();

  return {
    matrix: matrix
  };
};

var Main = React.createClass({
  getInitialState: () => getState(),

  componentDidMount () {
    MatrixStore.addChangeListener(this.handleChange);
  },

  componentDidUnmount () {
    MatrixStore.removeChangeListener(this.handleChange);
  },

  handleCellClick (cellState) {
    var x = (cellState.y);
    var y = (cellState.x);
    var updateRow = {matrix: {}};

    updateRow.matrix[x] = {$apply: function (x) {
      return (x[y] = 1, x);
    }};

    Actions.Matrix.updateMatrix(update(
      {matrix: MatrixStore.getInitialMatrix()},
      updateRow));
  },

  handleChange () {
    this.setState(getState());
  },

  render () {
    return (
      <main className="Main grid">
        <div className="grid__row">
          <div className="grid__col--4 grid__col--center">
            <h2>VISUAL</h2>
            <Matrix squareSize={20}
                    onCellClick={this.handleCellClick}
                    matrix={this.state.matrix}/>
          </div>
          <div className="grid__col--4 grid__col--center">
            <h2>SETTINGS</h2>
          </div>
        </div>
      </main>
    );
  }
});

module.exports = Main;
