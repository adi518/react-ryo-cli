import React from 'react';
import * as Scroll from 'react-scroll';
import { Nav, Hero, Page, Motto, GetStarted, Markdown } from 'react-components';

import Kobe from 'components/Kobe';
import 'animate.css/animate.min.css';
import Logo from 'components/Logo/Logo';
import readmePath from '../../../../README.md';

function Root() {
  return (
    <React.Fragment>
      <Nav />
      <Hero>
        <Logo />
        <Kobe />
        <Motto />
        <GetStarted />
        {/* <Terminal /> */}
      </Hero>
      <Scroll.Element name="Page-Markdown">
        <Page>
          <Markdown pathToMarkdown={readmePath} />
        </Page>
      </Scroll.Element>
    </React.Fragment>
  );
}

export default Root;
