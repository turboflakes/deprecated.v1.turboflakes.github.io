import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {isNetworkSupported} from './constants'
import Layout from './components/pages/layout'
import IndexPage from './components/pages/index_page'
import AboutPage from './components/pages/about_page'
import DisclaimerPage from './components/pages/disclaimer_page'
import withTheme from './theme/withTheme'


function LayoutRoute({
  layout: Layout,  
  page: Page,  
  ...rest
}) {
  return (
    <Route {...rest} render={props => {
        if (isNetworkSupported(props.match.params.network) || typeof props.match.params.network === "undefined") {
          return (
            <Layout {...props} >
              <Page {...props} />
            </Layout>
          )
        }
        return (
          <Redirect
            to={{
              pathname: "/polkadot",
              state: { from: props.location }
            }}
          />  
        )
      }
    } />
  );
}

function App() {
  return (
      <Router>
        <Switch>
          <LayoutRoute exact strict path="/about" layout={Layout} page={AboutPage} />
          <LayoutRoute exact strict path="/disclaimer" layout={Layout} page={DisclaimerPage} />
          <LayoutRoute exact strict path="/:network" layout={Layout} page={IndexPage} />
          <Redirect to="/polkadot" />
        </Switch>
      </Router>
  );
}

export default withTheme(App);
