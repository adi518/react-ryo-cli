// https://github.com/PrismJS/prism/issues/1171
// https://github.com/PrismJS/prism/issues/1409

import Prism from 'prismjs';
import React, { useState } from 'react';
import { useEffectOnce } from 'react-use';
import ReactMarkdown from 'react-markdown';
import styled, { css } from 'styled-components';

import 'prism-themes/themes/prism-atom-dark.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';

// https://github.com/rexxars/react-markdown/issues/69
function flatten(text, child) {
  return typeof child === 'string'
    ? text + child
    : React.Children.toArray(child.props.children).reduce(flatten, text);
}

function HeadingRenderer(props) {
  const children = React.Children.toArray(props.children);
  const text = children.reduce(flatten, '');
  const slug = text.toLowerCase().replace(/\W/g, '-');
  return React.createElement('h' + props.level, { id: slug }, props.children);
}

const inlineStyle = css`
  h1:first-child {
    margin-top: 4rem;
  }
`;

export const StyledMarkdown = styled.div`
  width: 100%;

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    margin-top: 1.5rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);

    @media (max-width: 575.98px) {
      padding-top: 2em;
      padding-bottom: 2em;
    }
  }

  code[class*='language-'],
  pre[class*='language-'] {
    line-height: 2;
  }

  ${({ inline }) => inline && inlineStyle}

  > p:first-child {
    display: none;
  }

  h1:not(:first-of-type) {
    margin-top: 6rem;
  }

  h1,
  h2,
  h3,
  h4 {
    border-bottom: 0.125rem solid rgba(0, 0, 0, 0.1);
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    a {
      &::before {
        content: '⚡️ ';
      }
    }
  }

  p {
    margin-top: 1.5rem;

    img {
      width: 100%;
      display: block;
      max-width: 767.98px;
      border-radius: 0.5rem;
      box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.25);
    }

    img[src$='.gif'] {
      max-width: 1024px;
    }
  }

  code {
    color: var(--color-gray);
    word-break: break-word;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.125rem;
    border-radius: 0.5rem;
    padding-bottom: 0.125rem;
    background-color: var(--color-gray-dark);
  }

  pre {
    code {
      padding: 0;
      background-color: unset;
    }
  }

  a {
    code {
      padding: 0;
      color: unset;
      background-color: unset;
    }
  }

  blockquote {
    margin: 0;

    p {
      padding-left: 1rem;
      border-left: 0.125rem solid var(--color-gray-dark);

      img {
        display: block;
      }
    }
  }

  /* copy-to-clipboard plugin CSS */
  .code-toolbar {
    position: relative;
  }

  .toolbar > div {
    position: absolute;
  }

  /* show-language */
  .toolbar > div:nth-child(1) {
    top: 0;
    right: 0;
    color: #666666;
    margin-top: 1rem;
    font-size: 0.6rem;
    font-weight: bold;
    margin-right: 1rem;
    letter-spacing: 0.05rem;
    text-transform: uppercase;
    transition: color var(--common-transition-time);

    &:hover {
      color: var(--color-gray);
    }
  }

  /* copy-to-clipboard */
  .toolbar > div:nth-child(2) {
    right: 0;
    bottom: 0;
    margin-right: 1rem;
    margin-bottom: 0.825rem;

    button {
      padding: 0;
      display: block;
      border-width: 0;
      font-size: 0.6rem;
      color: var(--color-gray);
      letter-spacing: 0.05rem;
      border-radius: 0.325rem;
      text-transform: uppercase;
      background-color: transparent;
      transition: background-color var(--common-transition-time),
        padding var(--common-transition-time);

      &:hover {
        color: #1d1f21;
        padding: 0.05rem 1rem;
        background-color: var(--color-gray);
      }
    }
  }

  /* alternative */
  // .toolbar-item button {
  //   padding: 0;
  //   font-size: 0;
  //   border-width: 0;
  //   transform-style: preserve-3d;
  //   background-color: transparent;

  //   &::before {
  //     content: '📋';
  //     display: block;
  //     font-size: initial;
  //     transform: translateZ(-1px);
  //   }
  // }
`;

const Markdown = ({ pathToMarkdown, inline }) => {
  const [markdown, setMarkdown] = useState(null);

  useEffectOnce(() => {
    (async () => {
      const markdown = await fetch(pathToMarkdown);
      const text = await markdown.text();
      setMarkdown(text);
      Prism.highlightAll();
    })();
  });

  return (
    <StyledMarkdown inline={inline}>
      <ReactMarkdown
        source={markdown}
        renderers={{ heading: HeadingRenderer }}
      />
    </StyledMarkdown>
  );
};

export default Markdown;
