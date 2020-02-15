import React from 'react';
import styled, { css } from 'styled-components';

const StyledSocial = styled.div`
  z-index: 1;
  display: grid;
  grid-gap: 0.5rem;
  margin-left: auto;
  grid-auto-flow: column;
`;

export const SocialIcon = styled.div`
  opacity: 0.5;
  transition: opacity var(--common-transition-time);

  &:hover {
    opacity: 1;
  }

  a {
    font-size: 0;
    display: block;
  }

  svg {
    fill: var(--color-text);
    ${({ isSticky }) =>
      isSticky
        ? css`
            width: 1.5rem;
          `
        : css`
            width: 2rem;
          `}
  }
`;

const Social = ({ children, isSticky }) => (
  <StyledSocial>
    {React.Children.map(children, child =>
      React.isValidElement(child)
        ? React.cloneElement(child, { isSticky })
        : child
    )}
  </StyledSocial>
);

export default Social;
