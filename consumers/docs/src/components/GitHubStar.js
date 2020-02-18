import React from 'react';
import styled from 'styled-components';
import GitHubButton from 'react-github-btn';

import pkg from '../../package.json';

const StyledGitHubStar = styled.div`
  font-size: 0;
  opacity: 0.5;
  margin-top: auto;
  margin-right: 0.5rem;
  letter-spacing: 0.05rem;
  transition: opacity var(--common-transition-time);

  &:hover {
    opacity: 1;
  }

  @media (max-width: 425px) {
    position: absolute;
    margin-top: 0;
    left: 1rem;
    top: 1rem;
  }
`;

const GitHubStar = () => (
  <StyledGitHubStar>
    <GitHubButton
      data-size="large"
      data-show-count="true"
      data-icon="octicon-star"
      href={pkg.repository.url}
      aria-label={`Star ${pkg.name} on GitHub`}
    >
      Star
    </GitHubButton>
  </StyledGitHubStar>
);

export default GitHubStar;
