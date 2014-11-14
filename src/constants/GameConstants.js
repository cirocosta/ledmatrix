var keyMirror = require('../utils/keyMirror');

module.exports = keyMirror('GAME', {
  START: false,
  RESET: false,
  STOP: false,

  CHANGE_DIRECTION: false,

  FRUIT_EATEN: false,
  CRASH: false,
});
