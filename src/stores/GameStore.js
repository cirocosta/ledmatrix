/**
 * Holds state and data regarding games that
 * might be being played at a given time.
 * Supposed to not hold well defined data, but
 * some more 'general purpose'.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var SnakeGame = require('matrix-snake');
var {MatrixActions, GameActions} = require('../actions');
var AppStore = require('./AppStore');
var Store = require('./Store');
var CONSTANTS = require('../constants');
var assign = require('object-assign');
var rafLoop = require('../utils/rafLoop')(5);
var ledNumbers = require('../utils/ledNumbers');
var keymaster = require('keymaster');

var _gameState = {
  running: false,
  fruits: 0
};

var _cbObj = new SnakeGame.CbObj();
var _game;

var _attachKeyHandlers = () => {
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

var _detachKeyHandlers = () => {
  ['w','a','s','d'].forEach(function (key) {
    keymaster.unbind(key);
  });
};

AppStore.addChangeListener(() => {
  if (_gameState.running &&
      AppStore.getAppState().ctrl !== CONSTANTS.App.CTRL_SNAKE) {
    GameActions.stopGame();
  }
});


var GameStore = assign({
  getGameState: () => _gameState,

  dispatcherIndex: AppDispatcher.register((payload) => {
    var action = payload.action;

    switch (action.actionType) {
      case CONSTANTS.Game.START:
        if (_gameState.running)
          return;

        _attachKeyHandlers();
        _game = SnakeGame.prepare(10, 10, _cbObj, GameActions.fruitEaten, GameActions.crash);
        _gameState.running = true;

        requestAnimationFrame(rafLoop.tick.bind(this, (milli) => {
          MatrixActions.updateMatrix(_game.next());
        }));

        GameStore.emitChange();
        break;

      case CONSTANTS.Game.RESET:
        _game = SnakeGame.prepare(10, 10, _cbObj, GameActions.fruitEaten, GameActions.crash);
        MatrixActions.updateExtendMatrix(ledNumbers.builder('0'));

        if (!_gameState.running)
          GameActions.startGame();
        break;

      case CONSTANTS.Game.STOP:
        _detachKeyHandlers();
        _gameState.running = false;
        cancelAnimationFrame(rafLoop.rAFid);

        GameStore.emitChange();
        break;

      case CONSTANTS.Game.CRASH:
        cancelAnimationFrame(rafLoop.rAFid);
        _gameState.running = false;
        MatrixActions.updateExtendMatrix(ledNumbers.X);

        GameStore.emitChange();
        break;

      case CONSTANTS.Game.FRUIT_EATEN:
        _gameState.fruits = action.fruits;
        MatrixActions.updateExtendMatrix(ledNumbers
                                          .builder
                                          .apply(null,
                                                 (action.fruits + '')
                                                    .split('')));
        GameStore.emitChange();
        break;
    }

    return true;
  })
}, Store);


module.exports = GameStore;

