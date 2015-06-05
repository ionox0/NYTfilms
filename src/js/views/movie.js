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
  toggleInBasket: function(e) {
    this.setState({ inBasket: !this.state.inBasket });
  },
  render: function() {
    return (
      <div className='movie'>
        <div className='title'>{this.props.data.display_title}</div>
        <img className='image' src={this.props.data.multimedia.resource.src}/>
      </div>
    );
  }
});