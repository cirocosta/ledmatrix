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
var SnakeGame = require('matrix-snake');
var keymaster = require('keymaster');

var update = React.addons.update;

var _rAFid;
var _cbObj = new SnakeGame.CbObj();
var _game;

var attachKeyHandlers = () => {
  keymaster('w,a,s,d', function (e, obj) {
    switch (obj.shortcut) {
      case 'w':
      _cbObj.emitDir('up');
      break;
      case 's':
      _cbObj.emitDir('down');
      break;
      case 'a':
      _cbObj.emitDir('left');
      break;
      case 'd':
      _cbObj.emitDir('right');
      break;
    }
  });
};

var detachKeyHandlers = () => {
  ['w','a','s','d'].forEach(function (key) {
    keymaster.unbind(key);
  });
};

var getState = () => {
  var matrix = MatrixStore.getMatrix();
  var settings = SettingsStore.getSettingsState();

  return {
    matrix: matrix,
    settings: settings,
    fruits: 0,
    crashes: 0
  };
};

var Main = React.createClass({
  /**
   * Lifecycle and store changes
   */

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

    if (this.state.settings.matrixManager === CONSTANTS.Settings.SNAKE) {
      attachKeyHandlers();
      _game = SnakeGame.prepare(10, 10, _cbObj, this.handleFruitEat, this.handleCrash);
      this.gameTick();
    } else {
      detachKeyHandlers();
      cancelAnimationFrame(_rAFid);
      _rAFid = 0;
    }
  },

  /**
   * Snake related
   */

  gameTick () {
    setTimeout(() => {
      this.setState(update(this.state, {matrix: {$set: _game.next()}}));
      _rAFid = requestAnimationFrame(this.gameTick);
    }, 150);
  },

  handleCrash () {
    this.setState(update(this.state, {crashes: {$set: ++this.state.crashes}}));
  },

  handleFruitEat () {
    this.setState(update(this.state, {fruits: {$set: ++this.state.fruits}}));
  },

  handleResetSnake () {
    _game = SnakeGame.prepare(10, 10, _cbObj, this.handleFruitEat, this.handleCrash);
    this.setState(update(this.state, {
      fruits: {$set: 0},
      crashes: {$set: 0},
      matrix: {$set: _game.next()}
    }));
  },

  /**
   * Render
   */

  render () {
    var mtx;

    if (this.state.settings.visualization ===
        CONSTANTS.Settings.TYPE_REACT_MATRIX) {
      var clickHandler = this.state.settings.matrixManager === CONSTANTS.Settings.CLICK ?
        this.handleCellClick :
        null;

      mtx = <Matrix squareSize={23}
                    onCellClick={clickHandler}
                    matrix={this.state.matrix} />;
    } else {
      mtx = <PreMatrix matrix={this.state.matrix} />;
    }

    var gameBtn = this.state.settings.matrixManager === CONSTANTS.Settings.SNAKE ?
       <div>
         <button className="reset" onClick={this.handleResetSnake}>RESET GAME</button>
         <p><strong>Fruits:</strong> {this.state.fruits}</p>
         <p><strong>Crashes:</strong> {this.state.crashes}</p>
       </div> :
       null;

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
            {gameBtn}
          </div>
        </div>
      </main>
    );
  }
});

module.exports = Main;
