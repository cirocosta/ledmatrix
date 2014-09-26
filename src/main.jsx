/**
 * @jsx React.DOM
 */

'use strict';

var React = require('react');
var Application = require('./components/Application.jsx');

var yaspm = require('yaspm');
var Machines = yaspm.Machines('');

Machines
  .search()
  .on('device', function (device) {
    device
      .connect()
      .on('connect', handleConnect.bind(null, device))
      .on('data', handleData.bind(null, device))
      .on('disconnect', handleDisconnect.bind(null, device));
  })
  .on('removeddevice', function (pnpId) {
    console.log('Just removed: ' + pnpId);
  });

function handleData (device, data) {
  console.log(data);
}

function handleConnect (device) {
  console.log('device connected!');
}

function handleDisconnect (device) {
  console.log('device disconnected :(');
}

React.renderComponent(
  <Application />,
  document.body
);
