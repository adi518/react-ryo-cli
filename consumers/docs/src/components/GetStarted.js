import React from 'react';
import styled from 'styled-components';
import * as Scroll from 'react-scroll';

import Button from 'components/Button';
import { NAV_STICKY_HEIGHT } from 'components/Nav';

import pkg from '../../package.json';

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

// const StyledGitHubStar = styled.div`
//   font-size: 0;
//   margin-top: 2rem;
//   letter-spacing: 0.05rem;
//   transform: translateY(5px);

//   @media (max-width: 425px) {
//     position: absolute;
//     margin-top: 0;
//     left: 1rem;
//     top: 1rem;
//   }
// `;

// const GitHubStar = () => (
//   <StyledGitHubStar>
//     <a
//       data-size="large"
//       data-show-count="true"
//       className="github-button"
//       href={pkg.repository.url}
//       aria-label={`Star ${pkg.name} on GitHub`}
//     >
//       Star
//     </a>
//   </StyledGitHubStar>
// );

const StyledGitHubButton = styled(Button)`
  @media (max-width: 425px) {
    display: none;
  }
`;

const GitHubButton = () => (
  <a href={pkg.repository.url} className="button">
    <StyledGitHubButton>GitHub</StyledGitHubButton>
  </a>
);

const GetStarted = () => (
  <StyledGetStarted>
    <Buttons>
      <Scroll.Link
        smooth
        to="Page-Markdown"
        className="button"
        offset={-NAV_STICKY_HEIGHT}
      >
        <Button>Get started</Button>
      </Scroll.Link>
      <GitHubButton />
    </Buttons>
    {/* <GitHubStar /> */}
  </StyledGetStarted>
);

export default GetStarted;
