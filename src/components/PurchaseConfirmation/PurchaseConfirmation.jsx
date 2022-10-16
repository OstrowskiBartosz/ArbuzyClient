import React from 'react';
import { Redirect, Link } from 'react-router-dom';
import '../../App.css';

export default class PurchaseConfirmation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      logInInfoReceived: false
    };
  }

  componentDidMount() {}

  render() {
    if (this.props.isLogged === false) {
      return <Redirect to="/login" />;
    } else if (this.state.isLoading) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="container-fluid">
          <div className="row navbar-padding">
            <div className="col-3"></div>
            <div className="col-6 mt-5 componentBackgroundColor mt-3 mb-3 shadow-sm p-3 bg-white rounded">
              <div className="row">
                <div className="col-12">
                  <div className="pb-5">
                    <h1>Przedmioty zostały kupione!</h1>
                  </div>
                  <Link className="btn btn-primary" to="/">
                    <h3>
                      <i className="fas fa-chevron-left"></i>
                      <span> Powrót do strony głównej.</span>
                    </h3>
                  </Link>
                </div>
              </div>
            </div>
            <div className="col-3"></div>
          </div>
        </div>
      );
    }
  }
}
