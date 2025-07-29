import React from 'react';
import { Link } from 'react-router-dom';

const Topbar = () => {
  return (
    <header>
      <div className="pt-14 pb-6 border-strong">
        <Link to="/" >
          <h3>Seongil Heo</h3>
          <h5>Graduate Student, University of Univ</h5>
        </Link>
      </div>
    </header>
  );
};

export default Topbar;