import React from 'react';
import { GlobalStyle, ScrollToTop, Footer } from 'react-components';

import Root from 'routes/Root';
import Head from 'components/Head';

function App() {
  return (
    <React.Fragment>
      <Head />
      <GlobalStyle />
      <div className="App">
        <Root />
        <Footer />
      </div>
      <ScrollToTop />
    </React.Fragment>
  );
}

export default App;
