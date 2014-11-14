/**
 * Holds state and data regarding games that
 * might be being played at a given time.
 * Supposed to not hold well defined data, but
 * some more 'general purpose'.
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var {MatrixActions, GameActions} = require('../actions');
var CONSTANTS = require('../constants');
var AppStore = require('./AppStore');
var Store = require('./Store');

var assign = require('object-assign');
var SnakeGame = require('matrix-snake');
var rafLoop = require('../utils/rafLoop')(5);
var ledNumbers = require('../utils/ledNumbers');

var _gameState = {
  running: false,
  fruits: 0
};

var _cbObj = new SnakeGame.CbObj();
var _game;

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
      case CONSTANTS.Game.CHANGE_DIRECTION:
        if (!_gameState.running)
          return;

        _cbObj.emitDir(action.direction);
        break;

      case CONSTANTS.Game.START:
        if (_gameState.running)
          return;

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

