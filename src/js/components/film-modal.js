'use-strict';

module.exports = React.createClass({
  close: function(){
    this.props.onCloseModal();
  },
  preventClose: function(e){
  	e.stopPropogation();
  },
  render: function() {
    if (this.props.film.multimedia) 
      var img = <img className='image' src={this.props.film.multimedia.resource.src}/>
    return (
      <div className='film-modal' onClick={this.close}>
      	<div className='film-modal-film'>
      		<div className='film-info-wrapper'>
      			{img}
	      		<div className='display-title'>
	      			{this.props.film.display_title}
	      		</div>
	      		<div className='display-title'>
	      			{this.props.film.byline}
	      		</div>
	      		<div className='display-title'>
	      			{this.props.film.headline}
	      		</div>
	      		<div className='display-title'>
	      			Publication Date: {this.props.film.publication_date}
	      		</div>
	      		<hr/>
	      		<div className='display-title'></div>
	      			{this.props.film.link.suggested_link_text}:
	      		<div className='display-title' onClick={this.preventClose}>
	      			<a href={this.props.film.link.url}>NY Times Review</a>
						</div>
					</div>
      	</div>
      </div>
    );
  }
});