import styled, { css } from 'styled-components';

export const SocialIcon = styled.div`
  opacity: 0.5;
  transition: opacity var(--common-transition-time);

  ${({ isSticky }) =>
    isSticky &&
    css`
      opacity: 1;
    `}
}

  &:hover {
    opacity: 1;
  }

  a {
    font-size: 0;
    display: block;
  }

  svg {
    width: 1.625rem;

    ${({ isSticky }) =>
      isSticky
        ? css`
            fill: var(--color-gray-light);
          `
        : css`
            fill: var(--color-gray);
          `}
  }
`;

export default SocialIcon;
