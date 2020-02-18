import React from 'react';
import styled from 'styled-components';

import GitHubStar from 'components/GitHubStar';
import GitHubAnchor from 'components/GitHubAnchor';
import FacebookAnchor from 'components/FacebookAnchor';

const StyledSocial = styled.div`
  z-index: 1;
  display: grid;
  grid-gap: 0.5rem;
  margin-left: auto;
  grid-auto-flow: column;
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

const SocialContainer = props => (
  <Social {...props}>
    <GitHubStar />
    <FacebookAnchor />
    <GitHubAnchor />
  </Social>
);

export default SocialContainer;
