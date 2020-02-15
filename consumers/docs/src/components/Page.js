import styled from 'styled-components';

export const StyledPage = styled.div`
  display: flex;
  min-height: 100vh;
  padding: 4rem 14rem;
  flex-direction: column;
  background-color: var(--color-background);

  > h1:not(:first-child) {
    margin-top: 4rem;
  }

  @media (max-width: 1024px) {
    padding-left: 6rem;
    padding-right: 6rem;
  }

  @media (max-width: 768px) {
    padding: 2rem;
  }
`;

const Page = StyledPage;

export default Page;
