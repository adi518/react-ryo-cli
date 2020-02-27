import React from 'react';
import ReactDOM from 'react-dom';
import { MetadataContext } from 'react-components';

import App from './App';
import ThemeProvider from 'components/ThemeProvider/ThemeProvider';
import * as serviceWorker from './serviceWorker';

import docsPkg from '../package.json';
import pkg from 'react-ryo-cli/package.json';

ReactDOM.render(
  <ThemeProvider>
    <MetadataContext.Provider value={{ pkg, docsPkg }}>
      <App />
    </MetadataContext.Provider>
  </ThemeProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
