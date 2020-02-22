import React from 'react';
import styled, { css } from 'styled-components';

import docsPkg from '../../package.json';
import pkg from '../../../../package/package.json';

const StyledTitle = styled.div`
  visibility: visible;
  text-transform: capitalize;

  ${({ isSticky }) =>
    isSticky
      ? css`
          opacity: 1;
          color: var(--color-gray-light);
        `
      : css`
          opacity: 0.5;
          color: var(--color-gray);
        `}
`;

const Title = props => (
  <StyledTitle {...props}>
    {pkg.version} - {docsPkg.name} {docsPkg.version}
  </StyledTitle>
);

export default Title;
