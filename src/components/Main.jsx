/**
 * @jsx React.DOM
 */

/**
 * Keeps a well structured 2 blocks main view.
 */

require('./Main.scss');

var React = require('react/addons');
var Visual = require('./Visual.jsx');
var Settings = require('./Settings.jsx');

var Main = React.createClass({
  render () {
    return (
      <main className="Main grid">
        <div className="grid__row">
          <div className="grid__col--4 grid__col--center">
            <Visual />
          </div>
          <div className="grid__col--4 grid__col--center">
            <Settings />
          </div>
        </div>
      </main>
    );
  }
});

module.exports = Main;
