import React from 'react';
import styled, { css } from 'styled-components';

import Emoji from 'components/Emoji';
import docsPkg from '../../package.json';
import pkg from 'react-ryo-cli/package.json';

const StyledTitle = styled.div`
  visibility: visible;
  text-transform: capitalize;
  transition: opacity var(--common-transition-time);

  span:not(:first-child) {
    margin-left: 1ch;
  }

  ${({ isSticky }) =>
    isSticky
      ? css`
          opacity: 1;
          color: var(--color-gray-light);
        `
      : css`
          opacity: 0.5;
          color: var(--color-gray);
        `};
`;

const Title = props => (
  <StyledTitle {...props}>
    {/* eslint-disable jsx-a11y/accessible-emoji */}
    <span>
      <Emoji>📦</Emoji> {pkg.version}
    </span>
    <span>
      <Emoji>📃</Emoji> {docsPkg.version}
    </span>
  </StyledTitle>
);

export default Title;
