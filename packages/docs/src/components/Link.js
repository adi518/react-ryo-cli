import styled from 'styled-components';

const Link = styled.a.attrs(() => ({
  rel: 'noopener noreferrer'
}))`
  &:not(.global-button) {
    color: var(--color-gray);
  }
`;

export default Link;
