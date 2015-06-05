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
    if (this.props.data.multimedia) var img = <img className='image' src={this.props.data.multimedia.resource.src}/>
    return (
      <div className='movie' data-summary={this.props.data.summary_short}>
        <div className='title'>{this.props.data.display_title}</div>
        {img}
      </div>
    );
  }
});