/**
 * @jsx React.DOM
 */

'use strict';

require('./Main.scss');
require('react-matrix/dist/react-matrix.css');

var React = require('react/addons');
var CONSTANTS = require('../constants');
var PreMatrix = require('./PreMatrix.jsx');
var Matrix = require('react-matrix/dist/react-matrix.js');
var Settings = require('./Settings.jsx');
var Actions = require('../actions');
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

var Main = React.createClass({
  /**
   * Lifecycle and store changes
   */

  getInitialState () {
    return {
      matrix: MatrixStore.getMatrix(),
      settings: SettingsStore.getSettingsState(),
      fruits: 0,
      crashes: 0,
      snake: false
    }
  },

  componentDidMount () {
    MatrixStore.addChangeListener(this.handleChange);
    SettingsStore.addChangeListener(this.handleChange);
  },

  componentDidUnmount () {
    MatrixStore.removeChangeListener(this.handleChange);
    SettingsStore.removeChangeListener(this.handleChange);
  },

  handleChange () {
    var matrix = MatrixStore.getMatrix();
    var settings = SettingsStore.getSettingsState();
    var snake = this.state.snake;

    if (settings.matrixManager === CONSTANTS.Settings.SNAKE) {
      attachKeyHandlers();

      if (!this.state.snake) {
        _game = SnakeGame.prepare(10, 10, _cbObj, this.handleFruitEat, this.handleCrash);
        _rAFid = requestAnimationFrame(this.gameTick);
        snake = true;
      }
    } else {
      detachKeyHandlers();
      cancelAnimationFrame(_rAFid);

      _rAFid = null;
      snake = false;
    }

    this.setState(update(this.state, {
      matrix: {$set: matrix},
      settings: {$set: settings},
      snake: {$set: snake},
    }));
  },

  /**
   * Click
   */

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

  /**
   * Snake related
   */

  gameTime: {
    _now: null,
    _then: Date.now(),
    _interval: 1000/6,
    _delta: null
  },

  gameTick () {
    requestAnimationFrame(this.gameTick);

    this.gameTime._now = Date.now();
    this.gameTime._delta = this.gameTime._now - this.gameTime._then;

    if (this.gameTime._delta <= this.gameTime._interval)
      return;

    this.gameTime._then = this.gameTime._now - (this.gameTime._delta % this.gameTime._interval);

    Actions.Matrix.updateMatrix(update(this.state, {matrix: {$set: _game.next()}}));
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
