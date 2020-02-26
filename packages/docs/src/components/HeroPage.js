import React from 'react';
import styled from 'styled-components';

import Logo from 'components/Logo';
import Motto from 'components/Motto';
// import Terminal from 'components/Terminal';
import GetStarted from 'components/GetStarted';

const StyledHeroPage = styled.div.attrs({ className: 'animated fadeIn' })`
  display: flex;
  min-height: 100vh;
  padding-top: 6rem;
  padding-left: 1rem;
  padding-right: 1rem;
  padding-bottom: 6rem;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  color: var(--color-gray);
  background-color: ${({ theme }) => theme.hero.backgroundColor};
`;

const HeroPage = () => (
  <StyledHeroPage>
    <Logo />
    <Motto />
    <GetStarted />
    {/* <Terminal /> */}
  </StyledHeroPage>
);

export default HeroPage;
