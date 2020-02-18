import styled from 'styled-components';

const Button = styled.button`
  outline: none;
  min-width: 10rem;
  font-size: 1.25rem;
  border-radius: 2rem;
  padding: 0.5rem 1.5rem;
  color: var(--color-gray);
  background-color: transparent;
  font-family: var(--font-family);
  border: 0.125rem solid var(--color-gray);
  transition: background-color var(--common-transition-time);

  &:focus {
    box-shadow: 0 0 0.25rem;
  }

  &:hover {
    color: var(--color-gray-dark);
    background-color: var(--color-gray);
  }
`;

export default Button;
