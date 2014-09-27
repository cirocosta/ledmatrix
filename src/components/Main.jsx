/**
 * @jsx React.DOM
 */

'use strict';

require('./Main.scss');

var React = require('react');
var Matrix = require('react-matrix/dist/react-matrix.js');

var Main = React.createClass({
  propTypes: {
    matrix: React.PropTypes.array
  },

  handleCellClick (cellState) {
    var x = (cellState.y);
    var y = (cellState.x);
  },

  render () {
    return (
      <main className="Main grid">
        <div className="grid__row">
          <div className="grid__col--4 grid__col--center">
            <h2>VISUAL</h2>
            <Matrix squareSize={20} onCellClick={function(c){console.log(c)}}
                    matrix={this.props.matrix}/>
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
