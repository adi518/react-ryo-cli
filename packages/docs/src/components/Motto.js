import cx from 'classnames';
import { useHoverDirty } from 'react-use';
import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';

import Emoji from 'components/Emoji';

const StyledMotto = styled.div`
  cursor: default;
  margin-top: 2rem;
`;

const rotateEmoji = keyframes`
  from {
    transform: rotateY(0deg);
  }

  to {
    transform: rotateY(-720deg);
  }
`;

const Line = styled.div`
  line-height: 2;
  font-size: 1.5rem;
  text-align: center;
  letter-spacing: 0.5rem;
  color: ${({ theme }) => theme.motto.color};
  transition: font-size var(--common-transition-time);

  &::before {
    content: '< ';
  }

  &::after {
    content: ' />';
  }

  @media (max-width: 767.98px) {
    font-size: 1rem;
  }

  @media (max-width: 575.98px) {
    font-size: 0.75rem;
  }

  .emoji {
    display: inline-block;
    animation-duration: 2s;
    animation-fill-mode: both;
    animation-play-state: paused;
    animation-iteration-count: 1;
    animation-name: ${rotateEmoji};

    &--animate,
    &--reverse-animate {
      animation-play-state: running;
    }

    &--reverse-animate {
      animation-direction: reverse;
    }
  }
`;

const resetAnimation = element => {
  element.style.animation = 'none';
  void element.offsetHeight;
  element.style.animation = null;
};

const Motto = () => {
  const emojiRef = useRef(null);
  const isHovering = useHoverDirty(emojiRef);
  const [animationEnded, setAnimationEnded] = useState(false);

  if (emojiRef.current && isHovering && animationEnded)
    resetAnimation(emojiRef.current);

  return (
    <StyledMotto>
      {/* eslint-disable jsx-a11y/accessible-emoji */}
      <Line className="animated pulse infinite slow">
        Roll your own CLI{' '}
        <Emoji
          ref={emojiRef}
          onAnimationStart={() => setAnimationEnded(false)}
          onAnimationEnd={() => setAnimationEnded(true)}
          className={cx('emoji', {
            'emoji--animate': isHovering,
            'emoji--reverse-animate': emojiRef.current && !isHovering
          })}
        >
          🤙
        </Emoji>
      </Line>
    </StyledMotto>
  );
};

export default Motto;
