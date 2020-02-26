import React from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';

import themes from './themes';

const getZeroOrOne = () => Math.floor(Math.random() * 2);

const ThemeProvider = ({ children }) => {
  const theme = [themes.normal, themes.alternate][getZeroOrOne()];
  return <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>;
};

export default ThemeProvider;
