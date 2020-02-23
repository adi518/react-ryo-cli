import React from 'react';
import * as Scroll from 'react-scroll';

import Nav from 'components/Nav';
import Page from 'components/Page';
import Footer from 'components/Footer';
import HeroPage from 'components/HeroPage';
import Markdown from 'components/Markdown';

import 'animate.css/animate.min.css';

import readmePath from '../../../../README.md';

function Root() {
  return (
    <React.Fragment>
      <Nav />
      <HeroPage />
      <Scroll.Element name="Page-Markdown">
        <Page>
          <Markdown pathToMarkdown={readmePath} />
        </Page>
      </Scroll.Element>
      <Footer />
    </React.Fragment>
  );
}

export default Root;
