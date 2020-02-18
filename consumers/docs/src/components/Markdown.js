import Prism from 'prismjs';
import React, { useState } from 'react';
import { useEffectOnce } from 'react-use';
import ReactMarkdown from 'react-markdown';
import styled, { css } from 'styled-components';

import 'prism-themes/themes/prism-atom-dark.css';

const inlineStyle = css`
  h1:first-child {
    margin-top: 4rem;
  }
`;

export const StyledMarkdown = styled.div`
  width: 100%;

  :not(pre) > code[class*='language-'],
  pre[class*='language-'] {
    margin-top: 2rem;
    border-radius: 0.5rem;
    box-shadow: 0 0 1rem rgba(0, 0, 0, 0.25);
  }

  code[class*='language-'],
  pre[class*='language-'] {
    line-height: 40px;
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

  p {
    img {
      width: 100%;
      max-width: 767.98px;
    }
  }

  code {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    padding-top: 0.125rem;
    padding-bottom: 0.125rem;
    border-radius: 0.5rem;
    color: var(--color-gray);
    background-color: var(--color-gray-dark);
  }

  pre {
    code {
      background-color: unset;
    }
  }

  a {
    code {
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
      <ReactMarkdown source={markdown} />
    </StyledMarkdown>
  );
};

export default Markdown;
