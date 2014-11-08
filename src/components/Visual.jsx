/**
 * @jsx React.DOM
 */

require('./Visual.scss');

var React = require('react');
var assign = require('object-assign');

var CONSTANTS = require('../constants');
var {storesGlueMixin} = require('../mixins');
var {MatrixActions} = require('../actions');
var {MatrixStore, AppStore} = require('../stores');

var ReactMatrix = require('react-matrix/dist/react-matrix.js');
var PreMatrix = require('./PreMatrix.jsx');


var Visual = React.createClass({
  mixins: [storesGlueMixin(MatrixStore, AppStore)],

  getStateFromStores () {
    return assign({}, AppStore.getAppState(),
                      MatrixStore.getMatrixState());
  },

  handleReactMatrixClick (cellState) {
    switch (this.state.ctrl) {
      case CONSTANTS.App.CTRL_CLICK:
        MatrixActions.activateCell([cellState.x, cellState.y], true);
        break;
    }
  },

  render () {
    var matrixVis = <p>A visualization must be selected</p>;

    switch (this.state.vis) {
      case CONSTANTS.App.VIS_PRE:
        matrixVis = <PreMatrix matrix={this.state.matrix} />;
        break;

      case CONSTANTS.App.VIS_REACT_MATRIX:
        matrixVis = <ReactMatrix squareSize={23}
                                 matrix={this.state.matrix}
                                 onCellClick={this.handleReactMatrixClick}
                                 cellStates={{1: 'active'}} />;
        break;
    }

    return (
      <article className="Visual">
        <h1>VISUAL</h1>
        {matrixVis}
      </article>
    );
  }
});

module.exports = Visual;
