import React from 'react';
import * as Scroll from 'react-scroll';

import Nav from 'components/Nav';
import Page from 'components/Page';
import Footer from 'components/Footer';
import HeroPage from 'components/HeroPage';
import Markdown from 'components/Markdown';

import 'animate.css/animate.min.css';

import markdownPath from '../../../../README.md';
// const markdownPath =
// 'https://raw.githubusercontent.com/adi518/react-ryo-cli/master/README.md';

function Root() {
  return (
    <React.Fragment>
      {/* eslint-disable jsx-a11y/accessible-emoji */}
      <Nav />
      <HeroPage />
      <Scroll.Element name="Page-Markdown">
        <Page>
          <Markdown pathToMarkdown={markdownPath} />
        </Page>
      </Scroll.Element>
      <Footer />
    </React.Fragment>
  );
}

export default Root;
