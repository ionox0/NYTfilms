'use-strict';

var Movie = require('./movie');
var NavigationControls = require('./navigation-controls');

module.exports = React.createClass({
  render: function() {
    var itemNodes = this.props.data.map(function(item, index) {
      return (
        <Movie data={item} key={index} />
      );
    });
    return (
      <div className="movies-list">
        {itemNodes}
        <NavigationControls prev={this.props.prev} next={this.props.next} />
      </div>
    );
  }
});