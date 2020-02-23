import React from 'react';
import styled from 'styled-components';

const StyledTerminal = styled.div`
  display: flex;
  z-index: -1;
  width: 45rem;
  height: 30rem;
  position: absolute;
  background-color: black;
  background-color: #050505;
  border: 0.125rem solid #333333;
  box-shadow: 4px 4px 0rem 0rem rgba(255, 255, 255, 0.1);

  @media (max-width: 767.98px) {
    display: none;
  }
`;

const TerminalTitleBar = styled.div`
  padding-right: 1rem;
  padding-left: 1rem;
  height: 2.5rem;
  flex: 1;
  display: flex;
  align-items: center;
  background-color: black;
  border-bottom: 0.125rem solid #333333;
`;

const TerminalControls = styled.div`
  display: grid;
  grid-gap: 0.5rem;
  grid-auto-flow: column;
`;

const TerminalControl = styled.div`
  opacity: 0.75;
  width: 0.75rem;
  height: 0.75rem;
  border-radius: 0.333rem;
  transition: opacity var(--common-transition-time);

  &:hover {
    opacity: 1;
  }
`;

const Terminate = styled(TerminalControl)`
  background-color: red;
`;

const Minimize = styled(TerminalControl)`
  background-color: var(--color-yellow);
`;

const Maximize = styled(TerminalControl)`
  background-color: green;
`;

const Terminal = () => (
  <StyledTerminal>
    <TerminalTitleBar>
      <TerminalControls>
        <Terminate />
        <Minimize />
        <Maximize />
      </TerminalControls>
    </TerminalTitleBar>
  </StyledTerminal>
);

export default Terminal;
