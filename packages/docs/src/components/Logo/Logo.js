import React from 'react';
import styled from 'styled-components';

import LogoSvg from 'components/Logo/LogoSvg';

const StyledLogo = styled.div`
  width: 100%;
  max-width: 684px;
`;

const Logo = () => (
  <StyledLogo>
    <LogoSvg />
  </StyledLogo>
);

export default Logo;
