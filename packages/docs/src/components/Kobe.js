import styled from 'styled-components';

import kobe from 'images/kobe.png';

const Kobe = styled.img.attrs({ src: kobe, alt: 'R.I.P. Kobe Bryant' })`
  right: 0;
  bottom: 0;
  width: 10rem;
  opacity: 0.025;
  position: absolute;
  transform: translateX(-1rem);
  transition: width var(--common-transition-time),
    opacity var(--common-transition-time);

  &:hover {
    opacity: 1;
  }

  @media (max-width: 575.98px) {
    width: 6rem;
  }
`;

export default Kobe;
