/**
 * Service discovery and advertisement over the
 * network.
 */

var mdns = require('mdns');

module.exports = {
  startAd (name, port) {
    var ad;
    var txtRecord = {name};

    ad = mdns.createAdvertisement(mdns.tcp('http'), port, txtRecord);
    ad.start();
  },

  startBrowser (serviceName) {
    var browser = mdns.createBrowser(mdns.tcp('http'));

    browser.on('serviceUp', (service) => {
      console.log("service up: ", service);
    });

    browser.on('serviceDown', (service) => {
      console.log("service down: ", service);
    });

    process.nextTick(() => {
      browser.start();
    });
  },

  getLocalIp () {
    var ifaces = require('os').networkInterfaces();
    var wlan0 = ifaces['wlan0'];

    if (!wlan0)
      return;

    return wlan0.length > 1 ? wlan0[0].address : '';
  }
};
