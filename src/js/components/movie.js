'use-strict';

module.exports = React.createClass({
  componentDidMount: function(){
    $(React.findDOMNode(this))
      .hover(
        function(){ $(this).addClass('rotate'); },
        function(){ $(this).removeClass('rotate'); }
      );
  },
  deentitify: function(string){
    var entity = { 
      amp: '&', quot: '"',
      rsquo: '\'', rsquo: '\'',
      ldquo: '\"', rdquo: '\"',
      lt: '<', gt: '>'
    };
    return string.replace(/&([^&;]+);/g, function(a, b) {
      var r = entity[b];
      return typeof r === 'string' ? r : a;
    });
  },
  showModal: function(){
    this.props.onShowModal(this.props.data);
  },
  render: function() {
    if (this.props.data.multimedia) 
      var img = <img className='image' src={this.props.data.multimedia.src}/>
    return (
      <div className='movie' onClick={this.showModal}>
        <div className='movie-wrapper'>
          <div className='title'>{this.deentitify(this.props.data.display_title)}</div>
          {img}
        </div>
        <div className='movie-info'>
          <div className='description'>{this.deentitify(this.props.data.summary_short)}</div>
        </div>
      </div>
    );
  }
});
