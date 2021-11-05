import '../styles/breadcrumb.scss';

import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '.';
import React from 'react';

export const Breadcrumb = ({ crumbs }:
  {
    crumbs: { path: string, pathname: string }[]
  }
) => (
  <nav className="breadcrumb">
    {crumbs.map(({ path, pathname }, index) => (
      <React.Fragment key={path}>
        <Link to={path} >{pathname}</Link>
        {crumbs.length - 1 > index ? <ChevronRightIcon /> : ''}
      </React.Fragment>
    ))}
  </nav>
);
