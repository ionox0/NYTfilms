'use-strict';

var MovieList = require('./components/movie-list');
var FilmModal = require('./components/film-modal');

module.exports = React.createClass({
  loadMovies: function(offset) {
    var url = offset ? 
      'http://corsproxy.ianjohnson.co/api.nytimes.com' +
      '/svc/movies/v2/reviews/picks.json?' + '&offset=' + offset + 
      '&api-key=a6e8a0b00b9e5d5181be666ce22d751e:4:72221351' : // Ternary
      'http://corsproxy.ianjohnson.co/api.nytimes.com' +
      '/svc/movies/v2/reviews/picks.json' +
      '?&api-key=a6e8a0b00b9e5d5181be666ce22d751e:4:72221351'
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
  showModal: function(film){
    this.setState({modalIsShowing: true, modalFilm: film});
  },
  closeModal: function(){
    this.setState({modalIsShowing: false})
  },
  render: function(){
    if (this.state.modalIsShowing) 
      var filmModal = <FilmModal film={this.state.modalFilm} onCloseModal={this.closeModal} />
    return (
      <div className='app'>
        {filmModal}
        <h1>New York Times Film Critics&#39; Picks</h1>
        <MovieList data={this.state.data.results} 
          navigate={this.navigate} 
          onShowModal={this.showModal} />
      </div>
    );
  }
});
