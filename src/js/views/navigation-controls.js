'use-strict';

module.exports = React.createClass({
  getInitialState: function () {
    return {
      currentPage: 0
    };
  },
  previous: function(e) {
    this.props.prev(this.state.currentPage);
  },
  next: function(e) {
    this.props.next(this.state.currentPage);
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