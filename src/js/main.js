'use-strict';

var App = require('./Movies-App');

React.render(
  <App url='http://localhost:1337/api.nytimes.com/svc/movies/v2/reviews/picks.json?api-key=a6e8a0b00b9e5d5181be666ce22d751e%3A4%3A72221351' pollInterval={2000} />,
  document.getElementById('content')
);
