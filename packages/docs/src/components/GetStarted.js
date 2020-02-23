import React from 'react';
import styled from 'styled-components';
import * as Scroll from 'react-scroll';

import Button from 'components/Button';
import GitHubButton from 'components/GitHubButton';
import { NAV_STICKY_HEIGHT_NEGATIVE } from 'components/Nav';

const StyledGetStarted = styled.div`
  display: flex;
  margin-top: 3rem;
  font-size: 1.5rem;
  text-align: center;
  flex-direction: column;
`;

const Buttons = styled.div`
  display: grid;
  grid-gap: 1rem;
  grid-auto-flow: column;

  @media (max-width: 425px) {
    grid-gap: 0;
  }
`;

const GetStartedButton = () => (
  <Scroll.Link
    smooth
    to="Page-Markdown"
    className="button"
    offset={NAV_STICKY_HEIGHT_NEGATIVE}
  >
    <Button>Get started</Button>
  </Scroll.Link>
);

const GetStarted = () => (
  <StyledGetStarted>
    <Buttons>
      <GetStartedButton />
      <GitHubButton />
    </Buttons>
  </StyledGetStarted>
);

export default GetStarted;
