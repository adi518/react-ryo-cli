import React from 'react';
import styled from 'styled-components';

import Link from 'components/Link';
import pkg from '../../package.json';

const StyledFooter = styled.footer`
  display: flex;
  padding: 8rem 2rem;
  min-height: 10rem;
  text-align: center;
  align-items: center;
  word-break: break-word;
  justify-content: center;
  color: var(--color-gray);
  background-color: var(--color-background-footer);
`;

const StyledHeart = styled.span`
  font-size: 0;
  vertical-align: middle;

  svg {
    width: 1.15rem;
    display: inline-block;
  }
`;

const Heart = () => (
  <StyledHeart>
    <svg
      fill="red"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path>
    </svg>
  </StyledHeart>
);

const Footer = () => (
  <StyledFooter>
    <div>
      Made with&nbsp;
      <Heart />
      {' by '}
      <Link href={pkg.author.url}>{pkg.author.name}</Link>
    </div>
  </StyledFooter>
);

export default Footer;
