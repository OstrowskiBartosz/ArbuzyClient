import React from 'react';
import { Link } from 'react-router-dom';

const MoveBack = ({ moveBackText = 'Wróć do strony głównej', moveBackURL = '/' }) => {
  return (
    <div className="container-fluid pt-5 mt-2 mb-5">
      <div className="row ">
        <div className="col-lg-4"></div>
        <div className="col-lg-4 text-left">
          <Link className="btn btn-outline-secondary" to={moveBackURL}>
            <i className="fas fa-chevron-left"></i> {moveBackText}
          </Link>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
};

export default MoveBack;
