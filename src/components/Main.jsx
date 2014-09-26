/**
 * @jsx React.DOM
 */

'use strict';

require('./Main.scss');

var React = require('react');

var Main = React.createClass({
  render () {
    return (
      <main className="Main grid">
        <div className="grid__row">
          <div className="grid__col--4 grid__col--center">
            <h2>VISUAL</h2>
          </div>
          <div className="grid__col--4 grid__col--center">
            <h2>SETTINGS</h2>
          </div>
        </div>
      </main>
    );
  }
});

module.exports = Main;
