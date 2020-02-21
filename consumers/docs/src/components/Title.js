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
          color: var(--color-gray-light);
        `
      : css`
          color: var(--color-gray);
        `}
`;

const Title = props => (
  <StyledTitle {...props}>
    {pkg.version} - {docsPkg.name} {docsPkg.version}
  </StyledTitle>
);

export default Title;
