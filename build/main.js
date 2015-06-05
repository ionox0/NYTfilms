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
    $.ajax({
      url: 'http://localhost:1337/api.nytimes.com/svc/movies/v2/reviews/picks.json?&api-key=a6e8a0b00b9e5d5181be666ce22d751e:4:72221351', //pagination: ' + offset? 'offset=' + offset:'' + '
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
    //setInterval(this.loadItemsFromServer, this.props.pollInterval);
  },
  previousPage: function(currentPage){
    console.log(currentPage);
  },
  nextPage: function(currentPage){
    console.log('here');
    this.loadMovies(currentPage);
  },
  render: function(){
    return (
      React.createElement("div", {className: "app"}, 
        React.createElement("h1", null, "Critics' Picks"), 
        React.createElement(MovieList, {data: this.state.data.results, prev: this.previousPage, next: this.nextPage})
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
        React.createElement(NavigationControls, {prev: this.props.prev, next: this.props.next})
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
  toggleInBasket: function(e) {
    this.setState({ inBasket: !this.state.inBasket });
  },
  render: function() {
    return (
      React.createElement("div", {className: "movie"}, 
        React.createElement("div", {className: "title"}, this.props.data.display_title), 
        React.createElement("img", {className: "image", src: this.props.data.multimedia.resource.src})
      )
    );
  }
});

},{}],"/home/ionox0/Desktop/NYTfilms/src/js/views/navigation-controls.js":[function(require,module,exports){
'use-strict';

module.exports = React.createClass({displayName: "exports",
  getInitialState: function () {
    return {
      currentPage: 0
    };
  },
  previous: function(e) {
    this.props.prev(this.state.currentPage);
  },
  next: function(e) {
    this.props.next(this.state.currentPage);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9pb25veDAvRGVza3RvcC9OWVRmaWxtcy9zcmMvanMvbWFpbi5qcyIsIi9ob21lL2lvbm94MC9EZXNrdG9wL05ZVGZpbG1zL3NyYy9qcy9Nb3ZpZXMtQXBwLmpzIiwiL2hvbWUvaW9ub3gwL0Rlc2t0b3AvTllUZmlsbXMvc3JjL2pzL3ZpZXdzL21vdmllLWxpc3QuanMiLCIvaG9tZS9pb25veDAvRGVza3RvcC9OWVRmaWxtcy9zcmMvanMvdmlld3MvbW92aWUuanMiLCIvaG9tZS9pb25veDAvRGVza3RvcC9OWVRmaWxtcy9zcmMvanMvdmlld3MvbmF2aWdhdGlvbi1jb250cm9scy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7QUFFYixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBRWxDLEtBQUssQ0FBQyxNQUFNO0VBQ1Ysb0JBQUMsR0FBRyxFQUFBLENBQUEsQ0FBQyxHQUFBLEVBQUcsQ0FBQyxnSUFBQSxFQUFnSSxDQUFDLFlBQUEsRUFBWSxDQUFFLElBQUssQ0FBQSxDQUFHLENBQUE7RUFDaEssUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7Q0FDbkMsQ0FBQzs7O0FDUEYsWUFBWSxDQUFDOztBQUViLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNyQyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs7QUFFOUMsb0NBQW9DLHVCQUFBO0VBQ2xDLFVBQVUsRUFBRSxTQUFTLE1BQU0sRUFBRTtJQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDO01BQ0wsR0FBRyxFQUFFLDZIQUE2SDtNQUNsSSxRQUFRLEVBQUUsTUFBTTtNQUNoQixPQUFPLEVBQUUsU0FBUyxJQUFJLENBQUM7UUFDckIsSUFBSSxD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QUFXO0lBQ2pCO01BQ0Usb0JBQUEsS0FBSSxFQUFBLENBQUEsQ0FBQyxTQUFBLEVBQVMsQ0FBQyxxQkFBc0IsQ0FBQSxFQUFBO1FBQ25DLG9CQUFBLFFBQU8sRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUMsVUFBQSxFQUFVLENBQUMsT0FBQSxFQUFPLENBQUUsSUFBSSxDQUFDLFFBQVUsQ0FBQSxFQUFBLFVBQWlCLENBQUEsRUFBQTtRQUNsRSxvQkFBQSxRQUFPLEVBQUEsQ0FBQSxDQUFDLEtBQUEsRUFBSyxDQUFDLE1BQUEsRUFBTSxDQUFDLE9BQUEsRUFBTyxDQUFFLElBQUksQ0FBQyxJQUFNLENBQUEsRUFBQSxNQUFhLENBQUE7TUFDbEQsQ0FBQTtNQUNOO0dBQ0g7Q0FDRixDQUFDIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Utc3RyaWN0JztcblxudmFyIEFwcCA9IHJlcXVpcmUoJy4vTW92aWVzLUFwcCcpO1xuXG5SZWFjdC5yZW5kZXIoXG4gIDxBcHAgdXJsPSdodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpLm55dGltZXMuY29tL3N2Yy9tb3ZpZXMvdjIvcmV2aWV3cy9waWNrcy5qc29uP2FwaS1rZXk9YTZlOGEwYjAwYjllNWQ1MTgxYmU2NjZjZTIyZDc1MWUlM0E0JTNBNzIyMjEzNTEnIHBvbGxJbnRlcnZhbD17MjAwMH0gLz4sXG4gIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdjb250ZW50Jylcbik7XG4iLCIndXNlLXN0cmljdCc7XG5cbnZhciBNb3ZpZSA9IHJlcXVpcmUoJy4vdmlld3MvbW92aWUnKTtcbnZhciBNb3ZpZUxpc3QgPSByZXF1aXJlKCcuL3ZpZXdzL21vdmllLWxpc3QnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGxvYWRNb3ZpZXM6IGZ1bmN0aW9uKG9mZnNldCkge1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6ICdodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpLm55dGltZXMuY29tL3N2Yy9tb3ZpZXMvdjIvcmV2aWV3cy9waWNrcy5qc29uPyZhcGkta2V5PWE2ZThhMGIwMGI5ZTVkNTE4MWJlNjY2Y2UyMmQ3NTFlOjQ6NzIyMjEzNTEnLCAvL3BhZ2luYXRpb246ICcgKyBvZmZzZXQ/ICdvZmZzZXQ9JyArIG9mZnNldDonJyArICdcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTogZGF0YX0pO1xuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBlcnIpe1xuICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMucHJvcHMudXJsLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgIH0pO1xuICB9LFxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHtkYXRhOiB7cmVzdWx0czogW119fTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5sb2FkTW92aWVzKCk7XG4gICAgLy9zZXRJbnRlcnZhbCh0aGlzLmxvYWRJdGVtc0Zyb21TZXJ2ZXIsIHRoaXMucHJvcHMucG9sbEludGVydmFsKTtcbiAgfSxcbiAgcHJldmlvdXNQYWdlOiBmdW5jdGlvbihjdXJyZW50UGFnZSl7XG4gICAgY29uc29sZS5sb2coY3VycmVudFBhZ2UpO1xuICB9LFxuICBuZXh0UGFnZTogZnVuY3Rpb24oY3VycmVudFBhZ2Upe1xuICAgIGNvbnNvbGUubG9nKCdoZXJlJyk7XG4gICAgdGhpcy5sb2FkTW92aWVzKGN1cnJlbnRQYWdlKTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpe1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nYXBwJz5cbiAgICAgICAgPGgxPkNyaXRpY3MmIzM5OyBQaWNrczwvaDE+XG4gICAgICAgIDxNb3ZpZUxpc3QgZGF0YT17dGhpcy5zdGF0ZS5kYXRhLnJlc3VsdHN9IHByZXY9e3RoaXMucHJldmlvdXNQYWdlfSBuZXh0PXt0aGlzLm5leHRQYWdlfSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7XG4iLCIndXNlLXN0cmljdCc7XG5cbnZhciBNb3ZpZSA9IHJlcXVpcmUoJy4vbW92aWUnKTtcbnZhciBOYXZpZ2F0aW9uQ29udHJvbHMgPSByZXF1aXJlKCcuL25hdmlnYXRpb24tY29udHJvbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGl0ZW1Ob2RlcyA9IHRoaXMucHJvcHMuZGF0YS5tYXAoZnVuY3Rpb24oaXRlbSwgaW5kZXgpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxNb3ZpZSBkYXRhPXtpdGVtfSBrZXk9e2luZGV4fSAvPlxuICAgICAgKTtcbiAgICB9KTtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb3ZpZXMtbGlzdFwiPlxuICAgICAgICB7aXRlbU5vZGVzfVxuICAgICAgICA8TmF2aWdhdGlvbkNvbnRyb2xzIHByZXY9e3RoaXMucHJvcHMucHJldn0gbmV4dD17dGhpcy5wcm9wcy5uZXh0fSAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7IiwiJ3VzZS1zdHJpY3QnO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgZ2V0SW5pdGlhbFN0YXRlOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGluQmFza2V0OiAoISF0aGlzLnByb3BzLmluQmFza2V0KSB8fCBmYWxzZVxuICAgIH07XG4gIH0sXG4gIGhhbmRsZVJlbW92ZTogZnVuY3Rpb24oZSkge1xuICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB0aGlzLnByb3BzLm9uSXRlbVJlbW92ZSh0aGlzLnByb3BzLmRhdGEpO1xuICB9LFxuICB0b2dnbGVJbkJhc2tldDogZnVuY3Rpb24oZSkge1xuICAgIHRoaXMuc2V0U3RhdGUoeyBpbkJhc2tldDogIXRoaXMuc3RhdGUuaW5CYXNrZXQgfSk7XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdtb3ZpZSc+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPSd0aXRsZSc+e3RoaXMucHJvcHMuZGF0YS5kaXNwbGF5X3RpdGxlfTwvZGl2PlxuICAgICAgICA8aW1nIGNsYXNzTmFtZT0naW1hZ2UnIHNyYz17dGhpcy5wcm9wcy5kYXRhLm11bHRpbWVkaWEucmVzb3VyY2Uuc3JjfS8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTsiLCIndXNlLXN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgY3VycmVudFBhZ2U6IDBcbiAgICB9O1xuICB9LFxuICBwcmV2aW91czogZnVuY3Rpb24oZSkge1xuICAgIHRoaXMucHJvcHMucHJldih0aGlzLnN0YXRlLmN1cnJlbnRQYWdlKTtcbiAgfSxcbiAgbmV4dDogZnVuY3Rpb24oZSkge1xuICAgIHRoaXMucHJvcHMubmV4dCh0aGlzLnN0YXRlLmN1cnJlbnRQYWdlKTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J25hdmlnYXRpb24tY29udHJvbHMnPlxuICAgICAgICA8YnV0dG9uIHZhbHVlPSdwcmV2aW91cycgb25DbGljaz17dGhpcy5wcmV2aW91c30+UHJldmlvdXM8L2J1dHRvbj5cbiAgICAgICAgPGJ1dHRvbiB2YWx1ZT0nbmV4dCcgb25DbGljaz17dGhpcy5uZXh0fT5OZXh0PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTsiXX0=
