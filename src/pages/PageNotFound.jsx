import React from 'react';
import { Link } from 'react-router-dom';

import { FontAwesomeIcon } from '@/icons';

const PageNotFound = () => {
  return (
    <div className="pages justify-center items-center text-center">
      <h1 className="text-slate-600">404</h1>
      <h2 className="text-slate-800">Page Not Found</h2>
      <p className="text-slate-600">
        The page you requested does not exist. <br />
        The address may be incorrect or the page may have been deleted.
      </p>

      <Link to="/" className="flex gap-3 items-center text-white bg-slate-600 hover:text-slate-600 hover:bg-white transition-colors border-2 border-slate-600 rounded-md py-4 px-8 ">
        <FontAwesomeIcon icon='house'/>
        Home
      </Link>
    </div>
  );
};

export default PageNotFound;
