import React from 'react';
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import {isNetworkSupported} from './constants'
import LayoutIndex from './components/pages/layout_index'
import LayoutDefault from './components/pages/layout_default'
import IndexPage from './components/pages/index_page'
import AboutPage from './components/pages/about_page'
import DisclaimerPage from './components/pages/disclaimer_page'
import ToolsPage from './components/pages/tools_page'
import NotReadyPage from './components/pages/not_ready_page'
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
          <LayoutRoute exact strict path="/about" layout={LayoutDefault} page={AboutPage} />
          <LayoutRoute exact strict path="/tools" layout={LayoutDefault} page={ToolsPage} />
          <LayoutRoute exact strict path="/validators" layout={LayoutDefault} page={NotReadyPage} />
          {/*  */}
          <LayoutRoute exact strict path="/disclaimer" layout={LayoutDefault} page={DisclaimerPage} />
          <LayoutRoute exact strict path="/privacy" layout={LayoutDefault} page={NotReadyPage} />
          <LayoutRoute exact strict path="/terms" layout={LayoutDefault} page={NotReadyPage} />
          <LayoutRoute exact strict path="/cookies" layout={LayoutDefault} page={NotReadyPage} />
          {/*  */}
          <LayoutRoute exact strict path="/:network" layout={LayoutIndex} page={IndexPage} />
          <Redirect to="/polkadot" />
        </Switch>
      </Router>
  );
}

export default withTheme(App);
