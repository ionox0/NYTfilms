(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"./src/js/main.js":[function(require,module,exports){
'use-strict';

var App = require('./Movies-App');

React.render(
  React.createElement(App, {url: "http://localhost:1337/api.nytimes.com/svc/movies/v2/reviews/picks.json?api-key=a6e8a0b00b9e5d5181be666ce22d751e%3A4%3A72221351", pollInterval: 2000}),
  document.getElementById('content')
);

},{"./Movies-App":"/home/ian/NYTfilms/src/js/Movies-App.js"}],"/home/ian/NYTfilms/src/js/Movies-App.js":[function(require,module,exports){
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

},{"./views/movie":"/home/ian/NYTfilms/src/js/views/movie.js","./views/movie-list":"/home/ian/NYTfilms/src/js/views/movie-list.js"}],"/home/ian/NYTfilms/src/js/views/movie-list.js":[function(require,module,exports){
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

},{"./movie":"/home/ian/NYTfilms/src/js/views/movie.js","./navigation-controls":"/home/ian/NYTfilms/src/js/views/navigation-controls.js"}],"/home/ian/NYTfilms/src/js/views/movie.js":[function(require,module,exports){
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

},{}],"/home/ian/NYTfilms/src/js/views/navigation-controls.js":[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9pYW4vTllUZmlsbXMvc3JjL2pzL21haW4uanMiLCIvaG9tZS9pYW4vTllUZmlsbXMvc3JjL2pzL01vdmllcy1BcHAuanMiLCIvaG9tZS9pYW4vTllUZmlsbXMvc3JjL2pzL3ZpZXdzL21vdmllLWxpc3QuanMiLCIvaG9tZS9pYW4vTllUZmlsbXMvc3JjL2pzL3ZpZXdzL21vdmllLmpzIiwiL2hvbWUvaWFuL05ZVGZpbG1zL3NyYy9qcy92aWV3cy9uYXZpZ2F0aW9uLWNvbnRyb2xzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUEsWUFBWSxDQUFDOztBQUViLElBQUksR0FBRyxHQUFHLE9BQU8sQ0FBQyxjQUFjLENBQUMsQ0FBQzs7QUFFbEMsS0FBSyxDQUFDLE1BQU07RUFDVixvQkFBQyxHQUFHLEVBQUEsQ0FBQSxDQUFDLEdBQUEsRUFBRyxDQUFDLGdJQUFBLEVBQWdJLENBQUMsWUFBQSxFQUFZLENBQUUsSUFBSyxDQUFBLENBQUcsQ0FBQTtFQUNoSyxRQUFRLENBQUMsY0FBYyxDQUFDLFNBQVMsQ0FBQztDQUNuQyxDQUFDOzs7QUNQRixZQUFZLENBQUM7O0FBRWIsSUFBSSxLQUFLLEdBQUcsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO0FBQ3JDLElBQUksU0FBUyxHQUFHLE9BQU8sQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDOztBQUU5QyxvQ0FBb0MsdUJBQUE7RUFDbEMsVUFBVSxFQUFFLFNBQVMsTUFBTSxFQUFFO0lBQzNCLENBQUMsQ0FBQyxJQUFJLENBQUM7TUFDTCxHQUFHLEVBQUUsNkhBQTZIO01BQ2xJLFFBQVEsRUFBRSxNQUFNO01BQ2hCLE9BQU8sRUFBRSxTQUFTLElBQUksQ0FBQztRQUNyQixJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7T0FDN0Is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LHFCQUFzQixDQUFBLEVBQUE7UUFDbkMsb0JBQUEsUUFBTyxFQUFBLENBQUEsQ0FBQyxLQUFBLEVBQUssQ0FBQyxVQUFBLEVBQVUsQ0FBQyxPQUFBLEVBQU8sQ0FBRSxJQUFJLENBQUMsUUFBVSxDQUFBLEVBQUEsVUFBaUIsQ0FBQSxFQUFBO1FBQ2xFLG9CQUFBLFFBQU8sRUFBQSxDQUFBLENBQUMsS0FBQSxFQUFLLENBQUMsTUFBQSxFQUFNLENBQUMsT0FBQSxFQUFPLENBQUUsSUFBSSxDQUFDLElBQU0sQ0FBQSxFQUFBLE1BQWEsQ0FBQTtNQUNsRCxDQUFBO01BQ047R0FDSDtDQUNGLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZS1zdHJpY3QnO1xuXG52YXIgQXBwID0gcmVxdWlyZSgnLi9Nb3ZpZXMtQXBwJyk7XG5cblJlYWN0LnJlbmRlcihcbiAgPEFwcCB1cmw9J2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkubnl0aW1lcy5jb20vc3ZjL21vdmllcy92Mi9yZXZpZXdzL3BpY2tzLmpzb24/YXBpLWtleT1hNmU4YTBiMDBiOWU1ZDUxODFiZTY2NmNlMjJkNzUxZSUzQTQlM0E3MjIyMTM1MScgcG9sbEludGVydmFsPXsyMDAwfSAvPixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKVxuKTtcbiIsIid1c2Utc3RyaWN0JztcblxudmFyIE1vdmllID0gcmVxdWlyZSgnLi92aWV3cy9tb3ZpZScpO1xudmFyIE1vdmllTGlzdCA9IHJlcXVpcmUoJy4vdmlld3MvbW92aWUtbGlzdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgbG9hZE1vdmllczogZnVuY3Rpb24ob2Zmc2V0KSB7XG4gICAgJC5hamF4KHtcbiAgICAgIHVybDogJ2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkubnl0aW1lcy5jb20vc3ZjL21vdmllcy92Mi9yZXZpZXdzL3BpY2tzLmpzb24/JmFwaS1rZXk9YTZlOGEwYjAwYjllNWQ1MTgxYmU2NjZjZTIyZDc1MWU6NDo3MjIyMTM1MScsIC8vcGFnaW5hdGlvbjogJyArIG9mZnNldD8gJ29mZnNldD0nICsgb2Zmc2V0OicnICsgJ1xuICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICB0aGlzLnNldFN0YXRlKHtkYXRhOiBkYXRhfSk7XG4gICAgICB9LmJpbmQodGhpcyksXG4gICAgICBlcnJvcjogZnVuY3Rpb24oeGhyLCBzdGF0dXMsIGVycil7XG4gICAgICAgIGNvbnNvbGUuZXJyb3IodGhpcy5wcm9wcy51cmwsIHN0YXR1cywgZXJyLnRvU3RyaW5nKCkpO1xuICAgICAgfS5iaW5kKHRoaXMpXG4gICAgfSk7XG4gIH0sXG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24oKXtcbiAgICByZXR1cm4ge2RhdGE6IHtyZXN1bHRzOiBbXX19O1xuICB9LFxuICBjb21wb25lbnREaWRNb3VudDogZnVuY3Rpb24oKXtcbiAgICB0aGlzLmxvYWRNb3ZpZXMoKTtcbiAgICAvL3NldEludGVydmFsKHRoaXMubG9hZEl0ZW1zRnJvbVNlcnZlciwgdGhpcy5wcm9wcy5wb2xsSW50ZXJ2YWwpO1xuICB9LFxuICBwcmV2aW91c1BhZ2U6IGZ1bmN0aW9uKGN1cnJlbnRQYWdlKXtcbiAgICBjb25zb2xlLmxvZyhjdXJyZW50UGFnZSk7XG4gIH0sXG4gIG5leHRQYWdlOiBmdW5jdGlvbihjdXJyZW50UGFnZSl7XG4gICAgY29uc29sZS5sb2coJ2hlcmUnKTtcbiAgICB0aGlzLmxvYWRNb3ZpZXMoY3VycmVudFBhZ2UpO1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSdhcHAnPlxuICAgICAgICA8aDE+Q3JpdGljcyYjMzk7IFBpY2tzPC9oMT5cbiAgICAgICAgPE1vdmllTGlzdCBkYXRhPXt0aGlzLnN0YXRlLmRhdGEucmVzdWx0c30gcHJldj17dGhpcy5wcmV2aW91c1BhZ2V9IG5leHQ9e3RoaXMubmV4dFBhZ2V9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTtcbiIsIid1c2Utc3RyaWN0JztcblxudmFyIE1vdmllID0gcmVxdWlyZSgnLi9tb3ZpZScpO1xudmFyIE5hdmlnYXRpb25Db250cm9scyA9IHJlcXVpcmUoJy4vbmF2aWdhdGlvbi1jb250cm9scycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgaXRlbU5vZGVzID0gdGhpcy5wcm9wcy5kYXRhLm1hcChmdW5jdGlvbihpdGVtLCBpbmRleCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPE1vdmllIGRhdGE9e2l0ZW19IGtleT17aW5kZXh9IC8+XG4gICAgICApO1xuICAgIH0pO1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vdmllcy1saXN0XCI+XG4gICAgICAgIHtpdGVtTm9kZXN9XG4gICAgICAgIDxOYXZpZ2F0aW9uQ29udHJvbHMgcHJldj17dGhpcy5wcm9wcy5wcmV2fSBuZXh0PXt0aGlzLnByb3BzLm5leHR9IC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59KTsiLCIndXNlLXN0cmljdCc7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4ge1xuICAgICAgaW5CYXNrZXQ6ICghIXRoaXMucHJvcHMuaW5CYXNrZXQpIHx8IGZhbHNlXG4gICAgfTtcbiAgfSxcbiAgaGFuZGxlUmVtb3ZlOiBmdW5jdGlvbihlKSB7XG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIHRoaXMucHJvcHMub25JdGVtUmVtb3ZlKHRoaXMucHJvcHMuZGF0YSk7XG4gIH0sXG4gIHRvZ2dsZUluQmFza2V0OiBmdW5jdGlvbihlKSB7XG4gICAgdGhpcy5zZXRTdGF0ZSh7IGluQmFza2V0OiAhdGhpcy5zdGF0ZS5pbkJhc2tldCB9KTtcbiAgfSxcbiAgcmVuZGVyOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J21vdmllJz5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9J3RpdGxlJz57dGhpcy5wcm9wcy5kYXRhLmRpc3BsYXlfdGl0bGV9PC9kaXY+XG4gICAgICAgIDxpbWcgY2xhc3NOYW1lPSdpbWFnZScgc3JjPXt0aGlzLnByb3BzLmRhdGEubXVsdGltZWRpYS5yZXNvdXJjZS5zcmN9Lz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pOyIsIid1c2Utc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50UGFnZTogMFxuICAgIH07XG4gIH0sXG4gIHByZXZpb3VzOiBmdW5jdGlvbihlKSB7XG4gICAgdGhpcy5wcm9wcy5wcmV2KHRoaXMuc3RhdGUuY3VycmVudFBhZ2UpO1xuICB9LFxuICBuZXh0OiBmdW5jdGlvbihlKSB7XG4gICAgdGhpcy5wcm9wcy5uZXh0KHRoaXMuc3RhdGUuY3VycmVudFBhZ2UpO1xuICB9LFxuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nbmF2aWdhdGlvbi1jb250cm9scyc+XG4gICAgICAgIDxidXR0b24gdmFsdWU9J3ByZXZpb3VzJyBvbkNsaWNrPXt0aGlzLnByZXZpb3VzfT5QcmV2aW91czwvYnV0dG9uPlxuICAgICAgICA8YnV0dG9uIHZhbHVlPSduZXh0JyBvbkNsaWNrPXt0aGlzLm5leHR9Pk5leHQ8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pOyJdfQ==
