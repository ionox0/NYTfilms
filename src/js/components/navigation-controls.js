'use-strict';

module.exports = React.createClass({
  getInitialState: function () {
    return {
      currentStart: 0
    };
  },
  previous: function(e) {
    if (this.state.currentStart < 20) return;
    this.props.navigate(this.state.currentStart - 20);
    this.setState({currentStart: this.state.currentStart - 20})
  },
  next: function(e) {
    this.props.navigate(this.state.currentStart + 20);
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