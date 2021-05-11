import React from 'react';
import Layout from './components/pages/layout_page'
import withTheme from './theme/withTheme'

function App() {
  return (
    <React.Fragment>
      <Layout />
    </React.Fragment>
  );
}

export default withTheme(App);
