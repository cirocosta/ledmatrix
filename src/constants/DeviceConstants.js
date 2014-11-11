var keyMirror = require('../utils/keyMirror');

module.exports = keyMirror('DEVICE', {
  ADD: false,
  REMOVE: false,
  SET_PRIORITY: false,

  EXPOSE_TO_LOCAL: false,
  SOCKET_CONNECT: false,
  SOCKET_DISCONNECT: false,
});
