import React from 'react';
import styled, { css } from 'styled-components';
import { useWindowScroll } from 'react-use';

import Title from 'components/Title';
import Social from 'components/Social';
import GitHubAnchor from 'components/GitHubAnchor';
import FacebookAnchor from 'components/FacebookAnchor';

export const NAV_STICKY_HEIGHT = 50.3594;

const StyledNav = styled.div`
  top: 0;
  z-index: 1;
  width: 100%;
  display: flex;
  padding: 1rem;
  position: absolute;
  align-items: center;
  transition: background-color var(--common-transition-time),
    padding var(--common-transition-time);

  ${({ isSticky }) =>
    isSticky &&
    css`
      position: fixed;
      padding-top: 0.8rem;
      padding-bottom: 0.8rem;
      background-color: var(--color-purple);
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
    <Social>
      <FacebookAnchor />
      <GitHubAnchor />
    </Social>
  </Nav>
);

export default NavContainer;
