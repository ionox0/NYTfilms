'use-strict';

module.exports = React.createClass({
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
      <div className='navigation-controls'>
        <button value='previous' onClick={this.previous}>Previous</button>
        <button value='next' onClick={this.next}>Next</button>
      </div>
    );
  }
});