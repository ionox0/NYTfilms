(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/js/main.js":[function(require,module,exports){
'use-strict';

var App = require('./Movies-App');

React.render(
  React.createElement(App, {url: "http://localhost:1337/api.nytimes.com/svc/movies/v2/reviews/picks.json?api-key=a6e8a0b00b9e5d5181be666ce22d751e%3A4%3A72221351", pollInterval: 2000}),
  document.getElementById('content')
);

},{"./Movies-App":"/home/ionox0/Desktop/NYTfilms/src/js/Movies-App.js"}],"/home/ionox0/Desktop/NYTfilms/src/js/Movies-App.js":[function(require,module,exports){
'use-strict';

var Movie = require('./views/movie');
var MovieList = require('./views/movie-list');

module.exports = React.createClass({displayName: "exports",
  loadMovies: function(offset) {
    var url = offset ? 'http://localhost:1337/api.nytimes.com/svc/movies/v2/reviews/picks.json?&offset=' + offset + '&api-key=a6e8a0b00b9e5d5181be666ce22d751e:4:72221351' :
      'http://localhost:1337/api.nytimes.com/svc/movies/v2/reviews/picks.json?&api-key=a6e8a0b00b9e5d5181be666ce22d751e:4:72221351'
    $.ajax({
      url: url,
      dataType: 'json',
      success: function(data){
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err){
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },
  getInitialState: function(){
    return {data: {results: []}};
  },
  componentDidMount: function(){
    this.loadMovies();
    //setInterval(this.loadMovies, this.props.pollInterval);
  },
  navigate: function(currentPage){
    this.loadMovies(currentPage);
  },
  render: function(){
    return (
      React.createElement("div", {className: "app"}, 
        React.createElement("h1", null, "New York Times Movie Critics' Picks"), 
        React.createElement(MovieList, {data: this.state.data.results, navigate: this.navigate})
      )
    );
  }
});

},{"./views/movie":"/home/ionox0/Desktop/NYTfilms/src/js/views/movie.js","./views/movie-list":"/home/ionox0/Desktop/NYTfilms/src/js/views/movie-list.js"}],"/home/ionox0/Desktop/NYTfilms/src/js/views/movie-list.js":[function(require,module,exports){
'use-strict';

var Movie = require('./movie');
var NavigationControls = require('./navigation-controls');

module.exports = React.createClass({displayName: "exports",
  render: function() {
    var itemNodes = this.props.data.map(function(item, index) {
      return (
        React.createElement(Movie, {data: item, key: index})
      );
    });
    return (
      React.createElement("div", {className: "movies-list"}, 
        itemNodes, 
        React.createElement(NavigationControls, {navigate: this.props.navigate})
      )
    );
  }
});

},{"./movie":"/home/ionox0/Desktop/NYTfilms/src/js/views/movie.js","./navigation-controls":"/home/ionox0/Desktop/NYTfilms/src/js/views/navigation-controls.js"}],"/home/ionox0/Desktop/NYTfilms/src/js/views/movie.js":[function(require,module,exports){
'use-strict';

module.exports = React.createClass({displayName: "exports",
  getInitialState: function () {
    return {
      inBasket: (!!this.props.inBasket) || false
    };
  },
  handleRemove: function(e) {
    e.preventDefault();
    this.props.onItemRemove(this.props.data);
  },
  componentDidMount: function(){
    $(React.findDOMNode(this))
      .hover(
        function(){ $(this).addClass('rotate'); },
        function(){ $(this).removeClass('rotate'); }
      );
  },
  deentitify: function(string){
    var entity = { 
      amp: '&',
      quot: '"',
      rsquo: '\'',
      rsquo: '\'',
      ldquo: '\"',
      rdquo: '\"',
      lt: '<',
      gt: '>'
    };
    return string.replace(/&([^&;]+);/g, function(a, b) {
      var r = entity[b];
      return typeof r === 'string' ? r : a;
    });
  },
  render: function() {
    if (this.props.data.multimedia) 
      var img = React.createElement("img", {className: "image", src: this.props.data.multimedia.resource.src})
    return (
      React.createElement("div", {className: "movie"}, 
        React.createElement("div", {className: "movie-wrapper"}, 
          React.createElement("div", {className: "title"}, this.deentitify(this.props.data.display_title)), 
          img
        ), 
        React.createElement("div", {className: "movie-info"}, 
          React.createElement("div", {className: "description"}, this.deentitify(this.props.data.summary_short))
        )
      )
    );
  }
});

},{}],"/home/ionox0/Desktop/NYTfilms/src/js/views/navigation-controls.js":[function(require,module,exports){
'use-strict';

module.exports = React.createClass({displayName: "exports",
  getInitialState: function () {
    return {
      currentStart: 0
    };
  },
  previous: function(e) {
    if (this.state.currentStart < 20) return;
    this.props.navigate(this.state.currentStart - 20);
    this.setState({currentStart: this.state.currentStart - 20})
  },
  next: function(e) {
    this.props.navigate(this.state.currentStart + 20);
    this.setState({currentStart: this.state.currentStart + 20})
  },
  render: function() {
    return (
      React.createElement("div", {className: "navigation-controls"}, 
        React.createElement("button", {value: "previous", onClick: this.previous}, "Previous"), 
        React.createElement("button", {value: "next", onClick: this.next}, "Next")
      )
    );
  }
});

},{}]},{},["./src/js/main.js"])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9pb25veDAvRGVza3RvcC9OWVRmaWxtcy9zcmMvanMvbWFpbi5qcyIsIi9ob21lL2lvbm94MC9EZXNrdG9wL05ZVGZpbG1zL3NyYy9qcy9Nb3ZpZXMtQXBwLmpzIiwiL2hvbWUvaW9ub3gwL0Rlc2t0b3AvTllUZmlsbXMvc3JjL2pzL3ZpZXdzL21vdmllLWxpc3QuanMiLCIvaG9tZS9pb25veDAvRGVza3RvcC9OWVRmaWxtcy9zcmMvanMvdmlld3MvbW92aWUuanMiLCIvaG9tZS9pb25veDAvRGVza3RvcC9OWVRmaWxtcy9zcmMvanMvdmlld3MvbmF2aWdhdGlvbi1jb250cm9scy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7QUFFYixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBRWxDLEtBQUssQ0FBQyxNQUFNO0VBQ1Ysb0JBQUMsR0FBRyxFQUFBLENBQUEsQ0FBQyxHQUFBLEVBQUcsQ0FBQyxnSUFBQSxFQUFnSSxDQUFDLFlBQUEsRUFBWSxDQUFFLElBQUssQ0FBQSxDQUFHLENBQUE7RUFDaEssUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7Q0FDbkMsQ0FBQzs7O0FDUEYsWUFBWSxDQUFDOztBQUViLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNyQyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs7QUFFOUMsb0NBQW9DLHVCQUFBO0VBQ2xDLFVBQVUsRUFBRSxTQUFTLE1BQU0sRUFBRTtJQUMzQixJQUFJLEdBQUcsR0FBRyxNQUFNLEdBQUcsaUZBQWlGLEdBQUcsTUFBTSxHQUFHLHNEQUFzRDtNQUNwSyw2SEFBNkg7SUFDL0gsQ0FBQyxDQUFDLElBQUksQ0FBQztNQUNMLEdBQUcsRUFBRSxHQUFHO01BQ1IsUUFBUSxFQUFFLE1BQU07TUFDaEIsT0FBTyxFQUFFLFNBQVMsSUFBSSxDQUFDO1FBQ3JCLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLENBQUMsQ0FBQztPQUM3QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7TUFDWixLQUFLLEVBQUUsU0FBUyxHQUFHLEVBQUUsTUFBTSxFQUFFLEdBQUcsQ0FBQztRQUMvQixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLE1BQU0sRUFBRSxHQUFHLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztPQUN2RCxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUM7S0FDYixDQUFDLENBQUM7R0FDSjtFQUNELGVBQWUsRUFBRSxVQUFVO0lBQ3pCLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztHQUM5QjtFQUNELGlCQUFpQixFQUFFLFVBQVU7QUFDL0IsSUFBSSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7O0dBRW5CO0VBQ0QsUUFBUSxFQUFFLFNBQVMsV0FBVyxDQUFDO0lBQzdCLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLENBQUM7R0FDOUI7RUFDRCxNQUFNLEVBQUUsVUFBVTtJQUNoQjtNQUNFLG9CQUFBLEtBQUksRUFBQSxDQUFBLENBQUMsU0FBQSxFQUFTLENBQUMsS0FBTSxDQUFBLEVBQUE7UUFDbkIsb0JBQUEsSUFBRyxFQUFBLElBQUMsRUFBQSxxQ0FBNEMsQ0FBQSxFQUFBO1FBQ2hELG9CQUFDLFNBQVMsRUFBQSxDQUFBLENBQUMsSUFBQSxFQUFJLENBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsUUFBQSxFQUFRLENBQUUsSUFBSSxDQUFDLFFBQVMsQ0FBQSxDQUFHLENBQUE7TUFDakUsQ0FBQTtNQUNOO0dBQ0g7Q0FDRixDQUFDLENBQUM7OztBQ3RDSCxZQUFZLENBQUM7O0FBRWIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQy9CLElBQUksa0JBQWtCLEdBQUcsT0FBTyxDQUFDLHVCQUF1QixDQUFDLENBQUM7O0FBRTFELG9DQUFvQyx1QkFBQTtFQUNsQyxNQUFNLEVBQUUsV0FBVztJQUNqQixJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsU0FBUyxJQUFJLEVBQUUsS0FBSyxFQUFFO01BQ3hEO1FBQ0Usb0JBQUMsS0FBSyxFQUFBLENBQUEsQ0FBQyxJQUFBLEVBQUksQ0FBRSxJQUFJLEVBQUMsQ0FBQyxHQUFBLEVBQUcsQ0FBRSxLQUFNLENBQUEsQ0FBRyxDQUFBO1FBQ2pDO0tBQ0gsQ0FBQyxDQUFDO0lBQ0g7TUFDRSxvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGFBQWMsQ0FBQSxFQUFBO1FBQzFCLFNBQVMsRUFBQztRQUNYLG9CQUFDLGtCQUFrQixFQUFBLENBQUEsQ0FBQyxRQUFBLEVBQVEsQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFFBQVMsQ0FBQSxDQUFHLENBQUE7TUFDakQsQ0FBQTtNQUNOO0dBQ0g7Q0FDRixDQUFDOzs7QUNuQkYsWUFBWSxDQUFDOztBQUViLG9DQUFvQyx1QkFBQTtFQUNsQyxlQUFlLEVBQUUsWUFBWTtJQUMzQixPQUFPO01BQ0wsUUFBUSxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxLQUFLLEtBQUs7S0FDM0MsQ0FBQztHQUNIO0VBQ0QsWUFBWSxFQUFFLFNBQVMsQ0FBQyxFQUFFO0lBQ3hCLENBQUMsQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUNuQixJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO0dBQzFDO0VBQ0QsaUJBQWlCLEVBQUUsVUFBVTtJQUMzQixDQUFDLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztPQUN2QixLQUFLO1FBQ0osVUFBVSxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRTtRQUN6QyxVQUFVLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxFQUFFO09BQzdDLENBQUM7R0FDTDtFQUNELFVBQVUsRUFBRSxTQUFTLE1BQU0sQ0FBQztJQUMxQixJQUFJLE1BQU0sR0FBRztNQUNYLEdBQUcsRUFBRSxHQUFHO01BQ1IsSUFBSSxFQUFFLEdBQUc7TUFDVCxLQUFLLEVBQUUsSUFBSTtNQUNYLEtBQUssRUFBRSxJQUFJO01BQ1gsS0FBSyxFQUFFLElBQUk7TUFDWCxLQUFLLEVBQUUsSUFBSTtNQUNYLEVBQUUsRUFBRSxHQUFHO01BQ1AsRUFBRSxFQUFFLEdBQUc7S0FDUixDQUFDO0lBQ0YsT0FBTyxNQUFNLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBRSxTQUFTLENBQUMsRUFBRSxDQUFDLEVBQUU7TUFDbEQsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQ2xCLE9BQU8sT0FBTyxDQUFDLEtBQUssUUFBUSxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDdEMsQ0FBQyxDQUFDO0dBQ0o7RUFDRCxNQUFNLEVBQUUsV0FBVztJQUNqQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFVBQVU7TUFDNUIsSUFBSSxHQUFHLEdBQUcsb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxPQUFBLEVBQU8sQ0FBQyxHQUFBLEVBQUcsQ0FBRSxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEdBQUksQ0FBRSxDQUFBO0lBQ2xGO01BQ0Usb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxPQUFRLENBQUEsRUFBQTtRQUNyQixvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGVBQWdCLENBQUEsRUFBQTtVQUM3QixvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLE9BQVEsQ0FBQSxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFRLENBQUEsRUFBQTtVQUM1RSxHQUFJO1FBQ0QsQ0FBQSxFQUFBO1FBQ04sb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxZQUFhLENBQUEsRUFBQTtVQUMxQixvQkFBQSxLQUFJLEVBQUEsQ0FBQSxDQUFDLFNBQUEsRUFBUyxDQUFDLGFBQWMsQ0FBQSxFQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFRLENBQUE7UUFDL0UsQ0FBQTtNQUNGLENBQUE7TUFDTjtHQUNIO0NBQ0YsQ0FBQzs7O0FDbERGLFlBQVksQ0FBQzs7QUFFYixvQ0FBb0MsdUJBQUE7RUFDbEMsZUFBZSxFQUFFLFlBQVk7SUFDM0IsT0FBTztNQUNMLFlBQVksRUFBRSxDQUFDO0tBQ2hCLENBQUM7R0FDSDtFQUNELFFBQVEsRUFBRSxTQUFTLENBQUMsRUFBRTtJQUNwQixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEVBQUUsRUFBRSxPQUFPO0lBQ3pDLElBQUksQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsWUFBWSxHQUFHLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLENBQUM7R0FDNUQ7RUFDRCxJQUFJLEVBQUUsU0FBUyxDQUFDLEVBQUU7SUFDaEIsSUFBSSxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLEdBQUcsRUFBRSxDQUFDLENBQUM7SUFDbEQsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksR0FBRyxFQUFFLENBQUMsQ0FBQztHQUM1RDtFQUNELE1BQU0sRUFBRSxXQUFXO0lBQ2pCO01BQ0Usb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxxQkFBc0IsQ0FBQSxFQUFBO1FBQ25DLG9CQUFBLFFBQU8sRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUMsVUFBQSxFQUFVLENBQUMsT0FBQSxFQUFPLENBQUUsSUFBSSxDQUFDLFFBQVUsQ0FBQSxFQUFBLFVBQWlCLENBQUEsRUFBQTtRQUNsRSxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLE1BQUEsRUFBTSxDQUFDLE9BQUEsRUFBTyxDQUFFLElBQUksQ0FBQyxJQUFNLENBQUEsRUFBQSxNQUFhLENBQUE7TUFDbEQsQ0FBQTtNQUNOO0dBQ0g7Q0FDRixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Utc3RyaWN0JztcblxudmFyIEFwcCA9IHJlcXVpcmUoJy4vTW92aWVzLUFwcCcpO1xuXG5SZWFjdC5yZW5kZXIoXG4gIDxBcHAgdXJsPSdodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpLm55dGltZXMuY29tL3N2Yy9tb3ZpZXMvdjIvcmV2aWV3cy9waWNrcy5qc29uP2FwaS1rZXk9YTZlOGEwYjAwYjllNWQ1MTgxYmU2NjZjZTIyZDc1MWUlM0E0JTNBNzIyMjEzNTEnIHBvbGxJbnRlcnZhbD17MjAwMH0gLz4sXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50Jylcbik7XG4iLCIndXNlLXN0cmljdCc7XG5cbnZhciBNb3ZpZSA9IHJlcXVpcmUoJy4vdmlld3MvbW92aWUnKTtcbnZhciBNb3ZpZUxpc3QgPSByZXF1aXJlKCcuL3ZpZXdzL21vdmllLWxpc3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGxvYWRNb3ZpZXM6IGZ1bmN0aW9uKG9mZnNldCkge1xuICAgIHZhciB1cmwgPSBvZmZzZXQgPyAnaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS5ueXRpbWVzLmNvbS9zdmMvbW92aWVzL3YyL3Jldmlld3MvcGlja3MuanNvbj8mb2Zmc2V0PScgKyBvZmZzZXQgKyAnJmFwaS1rZXk9YTZlOGEwYjAwYjllNWQ1MTgxYmU2NjZjZTIyZDc1MWU6NDo3MjIyMTM1MScgOlxuICAgICAgJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkubnl0aW1lcy5jb20vc3ZjL21vdmllcy92Mi9yZXZpZXdzL3BpY2tzLmpzb24/JmFwaS1rZXk9YTZlOGEwYjAwYjllNWQ1MTgxYmU2NjZjZTIyZDc1MWU6NDo3MjIyMTM1MSdcbiAgICAkLmFqYXgoe1xuICAgICAgdXJsOiB1cmwsXG4gICAgICBkYXRhVHlwZTogJ2pzb24nLFxuICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe2RhdGE6IGRhdGF9KTtcbiAgICAgIH0uYmluZCh0aGlzKSxcbiAgICAgIGVycm9yOiBmdW5jdGlvbih4aHIsIHN0YXR1cywgZXJyKXtcbiAgICAgICAgY29uc29sZS5lcnJvcih0aGlzLnByb3BzLnVybCwgc3RhdHVzLCBlcnIudG9TdHJpbmcoKSk7XG4gICAgICB9LmJpbmQodGhpcylcbiAgICB9KTtcbiAgfSxcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbigpe1xuICAgIHJldHVybiB7ZGF0YToge3Jlc3VsdHM6IFtdfX07XG4gIH0sXG4gIGNvbXBvbmVudERpZE1vdW50OiBmdW5jdGlvbigpe1xuICAgIHRoaXMubG9hZE1vdmllcygpO1xuICAgIC8vc2V0SW50ZXJ2YWwodGhpcy5sb2FkTW92aWVzLCB0aGlzLnByb3BzLnBvbGxJbnRlcnZhbCk7XG4gIH0sXG4gIG5hdmlnYXRlOiBmdW5jdGlvbihjdXJyZW50UGFnZSl7XG4gICAgdGhpcy5sb2FkTW92aWVzKGN1cnJlbnRQYWdlKTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpe1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nYXBwJz5cbiAgICAgICAgPGgxPk5ldyBZb3JrIFRpbWVzIE1vdmllIENyaXRpY3MmIzM5OyBQaWNrczwvaDE+XG4gICAgICAgIDxNb3ZpZUxpc3QgZGF0YT17dGhpcy5zdGF0ZS5kYXRhLnJlc3VsdHN9IG5hdmlnYXRlPXt0aGlzLm5hdmlnYXRlfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG4iLCIndXNlLXN0cmljdCc7XG5cbnZhciBNb3ZpZSA9IHJlcXVpcmUoJy4vbW92aWUnKTtcbnZhciBOYXZpZ2F0aW9uQ29udHJvbHMgPSByZXF1aXJlKCcuL25hdmlnYXRpb24tY29udHJvbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1Ob2RlcyA9IHRoaXMucHJvcHMuZGF0YS5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxNb3ZpZSBkYXRhPXtpdGVtfSBrZXk9e2luZGV4fSAvPlxuICAgICAgKTtcbiAgICB9KTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb3ZpZXMtbGlzdFwiPlxuICAgICAgICB7aXRlbU5vZGVzfVxuICAgICAgICA8TmF2aWdhdGlvbkNvbnRyb2xzIG5hdmlnYXRlPXt0aGlzLnByb3BzLm5hdmlnYXRlfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7IiwiJ3VzZS1zdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGluQmFza2V0OiAoISF0aGlzLnByb3BzLmluQmFza2V0KSB8fCBmYWxzZVxuICAgIH07XG4gIH0sXG4gIGhhbmRsZVJlbW92ZTogZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnByb3BzLm9uSXRlbVJlbW92ZSh0aGlzLnByb3BzLmRhdGEpO1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcbiAgICAkKFJlYWN0LmZpbmRET01Ob2RlKHRoaXMpKVxuICAgICAgLmhvdmVyKFxuICAgICAgICBmdW5jdGlvbigpeyAkKHRoaXMpLmFkZENsYXNzKCdyb3RhdGUnKTsgfSxcbiAgICAgICAgZnVuY3Rpb24oKXsgJCh0aGlzKS5yZW1vdmVDbGFzcygncm90YXRlJyk7IH1cbiAgICAgICk7XG4gIH0sXG4gIGRlZW50aXRpZnk6IGZ1bmN0aW9uKHN0cmluZyl7XG4gICAgdmFyIGVudGl0eSA9IHsgXG4gICAgICBhbXA6ICcmJyxcbiAgICAgIHF1b3Q6ICdcIicsXG4gICAgICByc3F1bzogJ1xcJycsXG4gICAgICByc3F1bzogJ1xcJycsXG4gICAgICBsZHF1bzogJ1xcXCInLFxuICAgICAgcmRxdW86ICdcXFwiJyxcbiAgICAgIGx0OiAnPCcsXG4gICAgICBndDogJz4nXG4gICAgfTtcbiAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyYoW14mO10rKTsvZywgZnVuY3Rpb24oYSwgYikge1xuICAgICAgdmFyIHIgPSBlbnRpdHlbYl07XG4gICAgICByZXR1cm4gdHlwZW9mIHIgPT09ICdzdHJpbmcnID8gciA6IGE7XG4gICAgfSk7XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGF0YS5tdWx0aW1lZGlhKSBcbiAgICAgIHZhciBpbWcgPSA8aW1nIGNsYXNzTmFtZT0naW1hZ2UnIHNyYz17dGhpcy5wcm9wcy5kYXRhLm11bHRpbWVkaWEucmVzb3VyY2Uuc3JjfS8+XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdtb3ZpZSc+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSdtb3ZpZS13cmFwcGVyJz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndGl0bGUnPnt0aGlzLmRlZW50aXRpZnkodGhpcy5wcm9wcy5kYXRhLmRpc3BsYXlfdGl0bGUpfTwvZGl2PlxuICAgICAgICAgIHtpbWd9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0nbW92aWUtaW5mbyc+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9J2Rlc2NyaXB0aW9uJz57dGhpcy5kZWVudGl0aWZ5KHRoaXMucHJvcHMuZGF0YS5zdW1tYXJ5X3Nob3J0KX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTsiLCIndXNlLXN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudFN0YXJ0OiAwXG4gICAgfTtcbiAgfSxcbiAgcHJldmlvdXM6IGZ1bmN0aW9uKGUpIHtcbiAgICBpZiAodGhpcy5zdGF0ZS5jdXJyZW50U3RhcnQgPCAyMCkgcmV0dXJuO1xuICAgIHRoaXMucHJvcHMubmF2aWdhdGUodGhpcy5zdGF0ZS5jdXJyZW50U3RhcnQgLSAyMCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y3VycmVudFN0YXJ0OiB0aGlzLnN0YXRlLmN1cnJlbnRTdGFydCAtIDIwfSlcbiAgfSxcbiAgbmV4dDogZnVuY3Rpb24oZSkge1xuICAgIHRoaXMucHJvcHMubmF2aWdhdGUodGhpcy5zdGF0ZS5jdXJyZW50U3RhcnQgKyAyMCk7XG4gICAgdGhpcy5zZXRTdGF0ZSh7Y3VycmVudFN0YXJ0OiB0aGlzLnN0YXRlLmN1cnJlbnRTdGFydCArIDIwfSlcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J25hdmlnYXRpb24tY29udHJvbHMnPlxuICAgICAgICA8YnV0dG9uIHZhbHVlPSdwcmV2aW91cycgb25DbGljaz17dGhpcy5wcmV2aW91c30+UHJldmlvdXM8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiB2YWx1ZT0nbmV4dCcgb25DbGljaz17dGhpcy5uZXh0fT5OZXh0PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTsiXX0=
