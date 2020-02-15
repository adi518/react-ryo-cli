import styled from 'styled-components';

const Link = styled.a.attrs(() => ({
  rel: 'noopener noreferrer'
}))`
  &:not(.button) {
    color: var(--color-text);
  }
`;

export default Link;
