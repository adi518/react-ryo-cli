import React from 'react';
import * as Scroll from 'react-scroll';
import { Nav, Hero } from 'react-components';

import Page from 'components/Page';
import Markdown from 'components/Markdown';

import 'animate.css/animate.min.css';

import readmePath from '../../../../README.md';

function Root() {
  return (
    <React.Fragment>
      <Nav />
      <Hero />
      <Scroll.Element name="Page-Markdown">
        <Page>
          <Markdown pathToMarkdown={readmePath} />
        </Page>
      </Scroll.Element>
    </React.Fragment>
  );
}

export default Root;
