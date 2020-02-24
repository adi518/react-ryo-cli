import * as styled from 'styled-components';

import './GlobalStyle.scss';

const GlobalStyle = styled.createGlobalStyle`
  html {
    box-sizing: border-box;
    scroll-behavior: smooth;
  }

  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }

  body {
    margin: 0;
    font-size: 1.15rem;
    font-family: var(--font-family);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button {
    font-family: var(--font-family);
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  a:not(.global-button) {
    text-decoration: none;
    color: var(--color-link);
    transition: color var(--common-transition-time),
      padding var(--common-transition-time),
      opacity var(--common-transition-time);

    &:hover {
      padding-left: 0.2rem;
      padding-right: 0.2rem;
      border-radius: 0.5rem;
      color: var(--color-link-hover);
      background-color: var(--color-link);
    }
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    line-height: 2;
    font-weight: 400;
  }

  h1 {
    font-size: 2rem;
  }

  p,
  li {
    line-height: 2;
  }
`;

export default GlobalStyle;
