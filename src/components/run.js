import React from 'react';
import { render } from 'react-dom';
import { createHistory } from 'history';
import { Router, Route, IndexRoute } from 'react-router';

import App from './App';
import Ranks from './Ranks';
import Kindergarten from './Kindergarten';
import MissingKindergarten from './MissingKindergarten';

render((
  <Router history={createHistory()}>
    <Route path='/' component={App} >
      <Route path='przedszkole/nie_znaleziono' component={MissingKindergarten} />
      <Route path='przedszkole/:id' component={Kindergarten} />
      <Route path='ranking' component={Ranks} />
    </Route>
  </Router>
), document.getElementById('app'))
