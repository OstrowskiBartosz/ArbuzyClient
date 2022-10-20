import React from 'react';
import { Link } from 'react-router-dom';

const RouteNotFound = () => {
  return (
    <div>
      <div className="row navbar-padding">
        <div className="col-lg-4"></div>
        <div className="col-lg-4 mt-5 componentBackgroundColor shadow-sm p-3 mb-5 bg-white rounded">
          <div className="card-body ">
            <div className="p-3 text-left">
              <h5 className="card-title bigfont">Oooops, ta podstrona nie istnieje :-(</h5>
            </div>
          </div>
        </div>
        <div className="col-lg-4"></div>
      </div>
      <div className="row pt-4">
        <div className="col-lg-3"></div>
        <div className="col-lg-5 text-left">
          <Link className="btn btn-outline-secondary" to="/">
            <i className="fas fa-chevron-left"></i> Cofnij do strony głównej
          </Link>
        </div>
        <div className="col-lg-4"></div>
      </div>
    </div>
  );
};

export default RouteNotFound;
