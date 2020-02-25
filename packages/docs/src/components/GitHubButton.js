import React from 'react';
import styled from 'styled-components';

import Button from 'components/Button';
import pkg from '../../package.json';

const StyledGitHubButton = styled(Button)`
  @media (max-width: 575.98px) {
    display: none;
  }
`;

const GitHubButton = () => (
  <a href={pkg.repository.url} className="global-button">
    <StyledGitHubButton>GitHub</StyledGitHubButton>
  </a>
);

export default GitHubButton;
