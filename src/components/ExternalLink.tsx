import React from 'react';

export type ExternalLinkProps = {
  className?: string;
  href: string;
  children: React.ReactNode;
};

function ExternalLink(props: ExternalLinkProps): React.ReactElement {
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  return <a {...props} target="_blank" rel="noopener noreferrer" />;
}

export default ExternalLink;
