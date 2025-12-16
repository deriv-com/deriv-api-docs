/* eslint-disable react/prop-types */
import React from 'react';

// Mock Docusaurus Link component
const Link = ({
  to,
  href,
  activeBasePath, // eslint-disable-line @typescript-eslint/no-unused-vars
  activeBaseRegex, // eslint-disable-line @typescript-eslint/no-unused-vars
  isNavLink, // eslint-disable-line @typescript-eslint/no-unused-vars
  prependBaseUrlToHref, // eslint-disable-line @typescript-eslint/no-unused-vars
  ...props
}) => {
  const destination = to || href || '';
  return <a href={destination} {...props} />;
};

export default Link;
