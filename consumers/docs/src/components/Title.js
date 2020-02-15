import React from 'react';
import styled from 'styled-components';

import pkg from '../../package.json';

const StyledTitle = styled.span`
  visibility: visible;
  color: var(--color-text);
`;

const Title = props => (
  <StyledTitle {...props}>
    {pkg.name} {pkg.version}
  </StyledTitle>
);

export default Title;
