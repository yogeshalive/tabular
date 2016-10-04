import React from 'react';
import ReactDOM from 'react-dom';

import { IndexRoute, Router, Route } from 'react-router';

import App from './components/App';

const routes = (
  <Router>
    <Route path='/' component={ App }>
      <IndexRoute component={ require('./cell-edit/demo') } />
    </Route>
  </Router>
);

ReactDOM.render(routes, document.querySelector('#root'));
