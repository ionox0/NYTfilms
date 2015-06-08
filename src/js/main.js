'use-strict';

var App = require('./Movies-App');

React.render(
  <App pollInterval={2000} />,
  document.getElementById('content')
);
