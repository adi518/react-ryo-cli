import React from 'react';
import styled from 'styled-components';

const StyledLogo = styled.div`
  transform: translateY(-1ch);

  // img {
  //   width: 100%;
  //   display: block;
  //   max-width: var(--max-width);
  //   transition: width var(--common-transition-time);
  // }
`;

// http://www.network-science.de/ascii/
// http://briankhuu.com/blog/self/2015/01/14/css-style-for-ascii-art.html
const Pre = styled.pre`
  --scale: 1;
  margin-top: 0;
  margin-bottom: 0;
  -webkit-background-clip: text;
  background-color: rebeccapurple;
  -webkit-text-fill-color: transparent;
  font-size: calc(var(--scale) * 1.25rem);
  line-height: calc(var(--scale) * 1.15rem);
  letter-spacing: calc(var(--scale) * -0.2rem);
  text-shadow: 0 0 0.5rem rgba(255, 255, 255, 0.05);
  transition: font-size var(--common-transition-time);
  font-family: 'Lucida Console', Monaco, monospace;

  @media (max-width: 767.98px) {
    --scale: 0.8;
  }

  @media (max-width: 575.98px) {
    --scale: 0.65;
  }

  @media (max-width: 375px) {
    --scale: 0.55;
  }
`;

const ascii = `
                         __                                    ___
   ________  ____ ______/ /_      _______  ______        _____/ (_)
  / ___/ _ \\/ __ \`/ ___/ __/_____/ ___/ / / / __ \\______/ ___/ / /
 / /  /  __/ /_/ / /__/ /_/_____/ /  / /_/ / /_/ /_____/ /__/ / /
/_/   \\___/\\__,_/\\___/\\__/     /_/   \\__, /\\____/      \\___/_/_/
                                    /____/
`;

const Logo = () => (
  <StyledLogo>
    <Pre dangerouslySetInnerHTML={{ __html: ascii }} />
  </StyledLogo>
);

export default Logo;
