'use-strict';

module.exports = React.createClass({
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
      var img = <img className='image' src={this.props.data.multimedia.resource.src}/>
    return (
      <div className='movie'>
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