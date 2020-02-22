import React from 'react';
import Helmet from 'react-helmet';
import capitalize from 'capitalize';

import docsPkg from '../../package.json';
import pkg from '../../../../package/package.json';

const { PUBLIC_URL } = process.env;
const PACKAGE_NAME = pkg.name.split('-').join(' ');
const TITLE = capitalize.words(`${PACKAGE_NAME} ${docsPkg.name}`);

// https://create-react-app.dev/docs/using-the-public-folder/#changing-the-html
const Head = ({
  title = TITLE,
  ogType = 'website',
  themeColor = '#040404',
  ogImage = 'og-image.png',
  ogImageWidth = '1200',
  ogImageHeight = '630'
}) => (
  <Helmet>
    <title>{title}</title>
    <meta name="theme-color" content={themeColor} />
    <meta name="description" content={pkg.description} />
    {/* <link rel="manifest" href={`${PUBLIC_URL}/site.webmanifest`} /> */}
    <link rel="apple-touch-icon" href={`${PUBLIC_URL}/logo192.png`} />
  </Helmet>
);

export default Head;
