'use-strict';

var Movie = require('./views/movie');
var MovieList = require('./views/movie-list');

module.exports = React.createClass({
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
      <div className='app'>
        <h1>Critics&#39; Picks</h1>
        <MovieList data={this.state.data.results} prev={this.previousPage} next={this.nextPage} />
      </div>
    );
  }
});
