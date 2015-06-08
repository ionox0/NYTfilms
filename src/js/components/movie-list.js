'use-strict';

var Movie = require('./movie');
var NavigationControls = require('./navigation-controls');

module.exports = React.createClass({
  render: function() {
    return (
      <div className="movies-list">
        {this.props.data.map(function(item, i){
          return (
            <Movie data={item} key={i} onShowModal={this.props.onShowModal} />
          );
        }, this )}
        <NavigationControls navigate={this.props.navigate} />
      </div>
    );
  }
});