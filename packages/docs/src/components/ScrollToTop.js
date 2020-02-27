import styled from 'styled-components';
import React, { useState } from 'react';
import { useUpdateEffect, useWindowScroll } from 'react-use';

const StyledScrollToTop = styled.div`
  right: 0;
  bottom: 0;
  opacity: 0;
  margin: 1rem;
  cursor: default;
  position: fixed;
  border-radius: 1rem;
  padding-left: 0.25rem;
  padding-right: 0.25rem;
  padding-bottom: 0.15rem;
  color: var(--color-link-hover);
  background-color: var(--color-purple);
  transition: color var(--common-transition-time),
    padding var(--common-transition-time), opacity var(--common-transition-time);

  &:hover {
    padding-left: 2rem;
    padding-right: 2rem;
    color: var(--color-link-hover);
  }

  ${({ visible }) => visible && `opacity: 1;`}
`;

const SCROLL_HEIGHT_SCALE = 0.667;

const ScrollToTop = () => {
  const { y: scrollYPosition } = useWindowScroll();
  const [scrollEnd, setScrollEnd] = useState(false);
  const handleClick = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  useUpdateEffect(() => {
    window.requestAnimationFrame(() => {
      setScrollEnd(
        scrollYPosition >= document.body.scrollHeight * SCROLL_HEIGHT_SCALE
      );
    });
  }, [scrollYPosition]);

  return (
    <StyledScrollToTop visible={scrollEnd} onClick={handleClick}>
      ↑
    </StyledScrollToTop>
  );
};

export default ScrollToTop;
