import React from 'react';

import Root from 'routes/Root';
import Head from 'components/Head';
import ScrollToTop from 'components/ScrollToTop';

import GlobalStyle from 'components/GlobalStyle/GlobalStyle';

function App() {
  return (
    <React.Fragment>
      <Head />
      <GlobalStyle />
      <div className="App">
        <Root />
      </div>
      <ScrollToTop />
    </React.Fragment>
  );
}

export default App;
