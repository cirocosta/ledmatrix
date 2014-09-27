/**
 * @jsx React.DOM
 */

'use strict';

require('./Main.scss');
require('react-matrix/dist/react-matrix.css');

var React = require('react/addons');
var CONSTANTS = require('../constants/Constants');
var PreMatrix = require('./PreMatrix.jsx');
var Matrix = require('react-matrix/dist/react-matrix.js');
var Settings = require('./Settings.jsx');
var Actions = require('../actions/Actions');
var MatrixStore = require('../stores/MatrixStore');
var SettingsStore = require('../stores/SettingsStore');

var update = React.addons.update;

var getState = () => {
  var matrix = MatrixStore.getMatrix();
  var settings = SettingsStore.getSettingsState();

  return {
    matrix: matrix,
    settings: settings
  };
};

var Main = React.createClass({
  getInitialState: () => getState(),

  componentDidMount () {
    MatrixStore.addChangeListener(this.handleChange);
    SettingsStore.addChangeListener(this.handleChange);
  },

  componentDidUnmount () {
    MatrixStore.removeChangeListener(this.handleChange);
    SettingsStore.removeChangeListener(this.handleChange);
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
    var mtx;

    if (this.state.settings.visualization ===
        CONSTANTS.Settings.TYPE_REACT_MATRIX) {
      mtx = <Matrix squareSize={20}
                    onCellClick={this.handleCellClick}
                    matrix={this.state.matrix} />;
    } else {
      mtx = <PreMatrix matrix={this.state.matrix} />;
    }

    return (
      <main className="Main grid">
        <div className="grid__row">
          <div className="grid__col--4 grid__col--center">
            <h2>VISUAL</h2>
            {mtx}
          </div>
          <div className="grid__col--4 grid__col--center">
            <h2>SETTINGS</h2>
            <Settings />
          </div>
        </div>
      </main>
    );
  }
});

module.exports = Main;
