import React from 'react';
import Root from 'routes/Root';
import GlobalStyle from 'components/GlobalStyle/GlobalStyle';

function App() {
  return (
    <React.Fragment>
      <GlobalStyle />
      <div className="App">
        <Root />
      </div>
    </React.Fragment>
  );
}

export default App;
