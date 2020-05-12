import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import Tickets from './containers/Tickets';
import './App.css';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/">
            <Tickets />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
