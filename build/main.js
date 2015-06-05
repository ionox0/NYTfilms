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
    console.log(this.state);
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
    //setInterval(this.loadItemsFromServer, this.props.pollInterval);
  },
  previousPage: function(currentPage){
    console.log(currentPage);
  },
  nextPage: function(currentPage){
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
  setTooltip: function(e) {
    console.log(React.findDOMNode(this));
    $(React.findDOMNode(this)).tipsy({
      title: function() { return this.getAttribute('data-summary'); }, 
      gravity: 'sw' 
    });
  },
  componentDidMount: function(){
    this.setTooltip();
  },
  render: function() {
    if (this.props.data.multimedia) var img = React.createElement("img", {className: "image", src: this.props.data.multimedia.resource.src})
    return (
      React.createElement("div", {className: "movie", "data-summary": this.props.data.summary_short}, 
        React.createElement("div", {className: "title"}, this.props.data.display_title), 
        img
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
    this.props.prev(this.state.currentStart - 20);
    this.setState({currentStart: this.state.currentStart - 20})
  },
  next: function(e) {
    this.props.next(this.state.currentStart + 20);
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
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvaG9tZS9pb25veDAvRGVza3RvcC9OWVRmaWxtcy9zcmMvanMvbWFpbi5qcyIsIi9ob21lL2lvbm94MC9EZXNrdG9wL05ZVGZpbG1zL3NyYy9qcy9Nb3ZpZXMtQXBwLmpzIiwiL2hvbWUvaW9ub3gwL0Rlc2t0b3AvTllUZmlsbXMvc3JjL2pzL3ZpZXdzL21vdmllLWxpc3QuanMiLCIvaG9tZS9pb25veDAvRGVza3RvcC9OWVRmaWxtcy9zcmMvanMvdmlld3MvbW92aWUuanMiLCIvaG9tZS9pb25veDAvRGVza3RvcC9OWVRmaWxtcy9zcmMvanMvdmlld3MvbmF2aWdhdGlvbi1jb250cm9scy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBLFlBQVksQ0FBQzs7QUFFYixJQUFJLEdBQUcsR0FBRyxPQUFPLENBQUMsY0FBYyxDQUFDLENBQUM7O0FBRWxDLEtBQUssQ0FBQyxNQUFNO0VBQ1Ysb0JBQUMsR0FBRyxFQUFBLENBQUEsQ0FBQyxHQUFBLEVBQUcsQ0FBQyxnSUFBQSxFQUFnSSxDQUFDLFlBQUEsRUFBWSxDQUFFLElBQUssQ0FBQSxDQUFHLENBQUE7RUFDaEssUUFBUSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUM7Q0FDbkMsQ0FBQzs7O0FDUEYsWUFBWSxDQUFDOztBQUViLElBQUksS0FBSyxHQUFHLE9BQU8sQ0FBQyxlQUFlLENBQUMsQ0FBQztBQUNyQyxJQUFJLFNBQVMsR0FBRyxPQUFPLENBQUMsb0JBQW9CLENBQUMsQ0FBQzs7QUFFOUMsb0NBQW9DLHVCQUFBO0VBQ2xDLFVBQVUsRUFBRSxTQUFTLE1BQU0sRUFBRTtJQUMzQixPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QixJQUFJLEdBQUcsR0FBRyxNQUFNLEdBQUcsaUZBQWlGLEdBQUcsTUFBTSxHQUFHLHNEQUFzRDtN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QSxFQUFBLE1BQWEsQ0FBQTtNQUNsRCxDQUFBO01BQ047R0FDSDtDQUNGLENBQUMiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZS1zdHJpY3QnO1xuXG52YXIgQXBwID0gcmVxdWlyZSgnLi9Nb3ZpZXMtQXBwJyk7XG5cblJlYWN0LnJlbmRlcihcbiAgPEFwcCB1cmw9J2h0dHA6Ly9sb2NhbGhvc3Q6MTMzNy9hcGkubnl0aW1lcy5jb20vc3ZjL21vdmllcy92Mi9yZXZpZXdzL3BpY2tzLmpzb24/YXBpLWtleT1hNmU4YTBiMDBiOWU1ZDUxODFiZTY2NmNlMjJkNzUxZSUzQTQlM0E3MjIyMTM1MScgcG9sbEludGVydmFsPXsyMDAwfSAvPixcbiAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRlbnQnKVxuKTtcbiIsIid1c2Utc3RyaWN0JztcblxudmFyIE1vdmllID0gcmVxdWlyZSgnLi92aWV3cy9tb3ZpZScpO1xudmFyIE1vdmllTGlzdCA9IHJlcXVpcmUoJy4vdmlld3MvbW92aWUtbGlzdCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IFJlYWN0LmNyZWF0ZUNsYXNzKHtcbiAgbG9hZE1vdmllczogZnVuY3Rpb24ob2Zmc2V0KSB7XG4gICAgY29uc29sZS5sb2codGhpcy5zdGF0ZSk7XG4gICAgdmFyIHVybCA9IG9mZnNldCA/ICdodHRwOi8vbG9jYWxob3N0OjEzMzcvYXBpLm55dGltZXMuY29tL3N2Yy9tb3ZpZXMvdjIvcmV2aWV3cy9waWNrcy5qc29uPyZvZmZzZXQ9JyArIG9mZnNldCArICcmYXBpLWtleT1hNmU4YTBiMDBiOWU1ZDUxODFiZTY2NmNlMjJkNzUxZTo0OjcyMjIxMzUxJyA6XG4gICAgICAnaHR0cDovL2xvY2FsaG9zdDoxMzM3L2FwaS5ueXRpbWVzLmNvbS9zdmMvbW92aWVzL3YyL3Jldmlld3MvcGlja3MuanNvbj8mYXBpLWtleT1hNmU4YTBiMDBiOWU1ZDUxODFiZTY2NmNlMjJkNzUxZTo0OjcyMjIxMzUxJ1xuICAgICQuYWpheCh7XG4gICAgICB1cmw6IHVybCxcbiAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICBzdWNjZXNzOiBmdW5jdGlvbihkYXRhKXtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7ZGF0YTogZGF0YX0pO1xuICAgICAgfS5iaW5kKHRoaXMpLFxuICAgICAgZXJyb3I6IGZ1bmN0aW9uKHhociwgc3RhdHVzLCBlcnIpe1xuICAgICAgICBjb25zb2xlLmVycm9yKHRoaXMucHJvcHMudXJsLCBzdGF0dXMsIGVyci50b1N0cmluZygpKTtcbiAgICAgIH0uYmluZCh0aGlzKVxuICAgIH0pO1xuICB9LFxuICBnZXRJbml0aWFsU3RhdGU6IGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIHtkYXRhOiB7cmVzdWx0czogW119fTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5sb2FkTW92aWVzKCk7XG4gICAgLy9zZXRJbnRlcnZhbCh0aGlzLmxvYWRJdGVtc0Zyb21TZXJ2ZXIsIHRoaXMucHJvcHMucG9sbEludGVydmFsKTtcbiAgfSxcbiAgcHJldmlvdXNQYWdlOiBmdW5jdGlvbihjdXJyZW50UGFnZSl7XG4gICAgY29uc29sZS5sb2coY3VycmVudFBhZ2UpO1xuICB9LFxuICBuZXh0UGFnZTogZnVuY3Rpb24oY3VycmVudFBhZ2Upe1xuICAgIHRoaXMubG9hZE1vdmllcyhjdXJyZW50UGFnZSk7XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9J2FwcCc+XG4gICAgICAgIDxoMT5Dcml0aWNzJiMzOTsgUGlja3M8L2gxPlxuICAgICAgICA8TW92aWVMaXN0IGRhdGE9e3RoaXMuc3RhdGUuZGF0YS5yZXN1bHRzfSBwcmV2PXt0aGlzLnByZXZpb3VzUGFnZX0gbmV4dD17dGhpcy5uZXh0UGFnZX0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pO1xuIiwiJ3VzZS1zdHJpY3QnO1xuXG52YXIgTW92aWUgPSByZXF1aXJlKCcuL21vdmllJyk7XG52YXIgTmF2aWdhdGlvbkNvbnRyb2xzID0gcmVxdWlyZSgnLi9uYXZpZ2F0aW9uLWNvbnRyb2xzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gUmVhY3QuY3JlYXRlQ2xhc3Moe1xuICByZW5kZXI6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBpdGVtTm9kZXMgPSB0aGlzLnByb3BzLmRhdGEubWFwKGZ1bmN0aW9uKGl0ZW0sIGluZGV4KSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8TW92aWUgZGF0YT17aXRlbX0ga2V5PXtpbmRleH0gLz5cbiAgICAgICk7XG4gICAgfSk7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW92aWVzLWxpc3RcIj5cbiAgICAgICAge2l0ZW1Ob2Rlc31cbiAgICAgICAgPE5hdmlnYXRpb25Db250cm9scyBwcmV2PXt0aGlzLnByb3BzLnByZXZ9IG5leHQ9e3RoaXMucHJvcHMubmV4dH0gLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pOyIsIid1c2Utc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBpbkJhc2tldDogKCEhdGhpcy5wcm9wcy5pbkJhc2tldCkgfHwgZmFsc2VcbiAgICB9O1xuICB9LFxuICBoYW5kbGVSZW1vdmU6IGZ1bmN0aW9uKGUpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgdGhpcy5wcm9wcy5vbkl0ZW1SZW1vdmUodGhpcy5wcm9wcy5kYXRhKTtcbiAgfSxcbiAgc2V0VG9vbHRpcDogZnVuY3Rpb24oZSkge1xuICAgIGNvbnNvbGUubG9nKFJlYWN0LmZpbmRET01Ob2RlKHRoaXMpKTtcbiAgICAkKFJlYWN0LmZpbmRET01Ob2RlKHRoaXMpKS50aXBzeSh7XG4gICAgICB0aXRsZTogZnVuY3Rpb24oKSB7IHJldHVybiB0aGlzLmdldEF0dHJpYnV0ZSgnZGF0YS1zdW1tYXJ5Jyk7IH0sIFxuICAgICAgZ3Jhdml0eTogJ3N3JyBcbiAgICB9KTtcbiAgfSxcbiAgY29tcG9uZW50RGlkTW91bnQ6IGZ1bmN0aW9uKCl7XG4gICAgdGhpcy5zZXRUb29sdGlwKCk7XG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgaWYgKHRoaXMucHJvcHMuZGF0YS5tdWx0aW1lZGlhKSB2YXIgaW1nID0gPGltZyBjbGFzc05hbWU9J2ltYWdlJyBzcmM9e3RoaXMucHJvcHMuZGF0YS5tdWx0aW1lZGlhLnJlc291cmNlLnNyY30vPlxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT0nbW92aWUnIGRhdGEtc3VtbWFyeT17dGhpcy5wcm9wcy5kYXRhLnN1bW1hcnlfc2hvcnR9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT0ndGl0bGUnPnt0aGlzLnByb3BzLmRhdGEuZGlzcGxheV90aXRsZX08L2Rpdj5cbiAgICAgICAge2ltZ31cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn0pOyIsIid1c2Utc3RyaWN0JztcblxubW9kdWxlLmV4cG9ydHMgPSBSZWFjdC5jcmVhdGVDbGFzcyh7XG4gIGdldEluaXRpYWxTdGF0ZTogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiB7XG4gICAgICBjdXJyZW50U3RhcnQ6IDBcbiAgICB9O1xuICB9LFxuICBwcmV2aW91czogZnVuY3Rpb24oZSkge1xuICAgIHRoaXMucHJvcHMucHJldih0aGlzLnN0YXRlLmN1cnJlbnRTdGFydCAtIDIwKTtcbiAgICB0aGlzLnNldFN0YXRlKHtjdXJyZW50U3RhcnQ6IHRoaXMuc3RhdGUuY3VycmVudFN0YXJ0IC0gMjB9KVxuICB9LFxuICBuZXh0OiBmdW5jdGlvbihlKSB7XG4gICAgdGhpcy5wcm9wcy5uZXh0KHRoaXMuc3RhdGUuY3VycmVudFN0YXJ0ICsgMjApO1xuICAgIHRoaXMuc2V0U3RhdGUoe2N1cnJlbnRTdGFydDogdGhpcy5zdGF0ZS5jdXJyZW50U3RhcnQgKyAyMH0pXG4gIH0sXG4gIHJlbmRlcjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPSduYXZpZ2F0aW9uLWNvbnRyb2xzJz5cbiAgICAgICAgPGJ1dHRvbiB2YWx1ZT0ncHJldmlvdXMnIG9uQ2xpY2s9e3RoaXMucHJldmlvdXN9PlByZXZpb3VzPC9idXR0b24+XG4gICAgICAgIDxidXR0b24gdmFsdWU9J25leHQnIG9uQ2xpY2s9e3RoaXMubmV4dH0+TmV4dDwvYnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufSk7Il19
