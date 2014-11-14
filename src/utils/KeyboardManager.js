var keymaster = require('keymaster');
var {GameActions} = require('../actions');
var {GameStore} = require('../stores');

var _attached = false;

var _attachKeyHandlers = () => {
  keymaster('w,a,s,d', function (e, obj) {
    switch (obj.shortcut) {
      case 'w':
      GameActions.changeDirection('up');
      break;

      case 's':
      GameActions.changeDirection('down');
      break;

      case 'a':
      GameActions.changeDirection('left');
      break;

      case 'd':
      GameActions.changeDirection('right');
      break;
    }
  });
};

var _detachKeyHandlers = () => {
  ['w','a','s','d'].forEach(function (key) {
    keymaster.unbind(key);
  });
};

function onStartOrEnd () {
  var gameState = GameStore.getGameState();

  if (!gameState.running && _attached)
    (_detachKeyHandlers(), _attached = false);
  else if (gameState.running && !_attached)
    (_attachKeyHandlers(), _attached = true);
  else
    return;
}

function init () {
  GameStore.addChangeListener(onStartOrEnd);
}

function finalize () {
  GameStore.removeChangeListener(onStartOrEnd);
}

module.exports = {
  init: init,
  finalize: finalize
};
