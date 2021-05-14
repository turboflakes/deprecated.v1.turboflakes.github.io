import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Layout from './components/pages/layout_page'
import withTheme from './theme/withTheme'

function App() {
  return (
      <Router>
        <Switch>
          <Route exact path="/">
            <Layout />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
  );
}

export default withTheme(App);
