import styled from 'styled-components';

const Button = styled.button`
  outline: none;
  min-width: 10rem;
  font-size: 1.25rem;
  border-radius: 2rem;
  padding: 0.5rem 1.5rem;
  background-color: transparent;
  font-family: var(--font-family);
  color: ${({ theme }) => theme.button.color};
  transition: background-color var(--common-transition-time);
  border: 0.125rem solid ${({ theme }) => theme.button.borderColor};

  &:focus {
    box-shadow: 0 0 0.25rem;
  }

  &:hover {
    color: ${({ theme }) => theme.button.colorHover};
    background-color: ${({ theme }) => theme.button.backgroundColorHover};
  }
`;

export default Button;
