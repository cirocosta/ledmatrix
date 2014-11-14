var CONSTANTS = require('../constants');
var AppDispatcher = require('../dispatcher/AppDispatcher');

var GameActions = {
  resetGame () {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Game.RESET
    });
  },

  startGame () {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Game.START
    });
  },

  stopGame () {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Game.STOP
    });
  },

  crash () {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Game.CRASH
    });
  },

  fruitEaten (fruits) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Game.FRUIT_EATEN,
      fruits: fruits
    });
  },

  changeDirection (direction) {
    AppDispatcher.handleViewAction({
      actionType: CONSTANTS.Game.CHANGE_DIRECTION,
      direction: direction
    });
  },
};

module.exports = GameActions;
