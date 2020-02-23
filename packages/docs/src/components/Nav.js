import React from 'react';
import { useWindowScroll } from 'react-use';
import styled, { css } from 'styled-components';

import Title from 'components/Title';
import Social from 'components/Social';

export const NAV_STICKY_HEIGHT = 50.3594;
export const NAV_STICKY_HEIGHT_NEGATIVE = -NAV_STICKY_HEIGHT;

const StyledNav = styled.div`
  top: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  padding: 1rem;
  position: absolute;
  align-items: center;
  transition: padding var(--common-transition-time),
    background-color var(--common-transition-time);

  ${({ isSticky }) =>
    isSticky &&
    css`
      position: fixed;
      padding-top: 0.8rem;
      padding-bottom: 0.8rem;
      background-color: var(--color-background-nav-sticky);
    `}
`;

const Nav = ({ children }) => {
  const { y: scrollYPosition } = useWindowScroll();
  const isSticky = scrollYPosition > 0;

  return (
    <StyledNav isSticky={isSticky}>
      {React.Children.map(children, child =>
        React.isValidElement(child)
          ? React.cloneElement(child, { isSticky })
          : child
      )}
    </StyledNav>
  );
};

const NavContainer = () => (
  <Nav>
    <Title />
    <Social />
  </Nav>
);

export default NavContainer;
