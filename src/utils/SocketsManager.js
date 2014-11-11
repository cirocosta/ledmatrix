/**
 * Manages socket connections and also MSDN.
 */

var mdns = require('mdns');
var express = require('express');
var ps = require('portscanner');
var io = require('socket.io');
var path = require('path');
var {DeviceActions} = require('../actions');

var app = express();
var localIp = _getLocalIp();
var HOST = '0.0.0.0';
var server;

function _getLocalIp () {
  var ifaces = require('os').networkInterfaces();
  var wlan0 = ifaces['wlan0'];

  if (!wlan0)
    return;

  return wlan0.length > 1 ? wlan0[0].address : '';
}

module.exports = {
  init () {
    return new Promise((resolver) => {
      ps.findAPortNotInUse(3000, 3010, HOST, function (err, port) {
        if (err) resolver.reject(err);

        server = app.listen(port, HOST, function () {
          var url = "http://" + _getLocalIp() + ':' + server.address().port;

          _io = io(server);
          _io.set('transports', 'websocket');
          _io.sockets.on('connection', (socket) => {
            DeviceActions.socketConnect(socket);

            socket.on('disconnect', () => {
              DeviceActions.socketDisconnect(socket);
            });
          });

          resolver.resolve(url);
        });
      });
    });
  },

  startAd (name, port) {
    var txtRecord = {name};

    _ad = mdns.createAdvertisement(mdns.tcp('http'), port, txtRecord);
    _ad.start();
  },

  startBrowser (serviceName) {
    _browser = mdns.createBrowser(mdns.tcp('http'));

    _browser.on('serviceUp', (service) => {
      console.log("service up: ", service);
    });

    _browser.on('serviceDown', (service) => {
      console.log("service down: ", service);
    });

    process.nextTick(() => {
      _browser.start();
    });
  },
};
