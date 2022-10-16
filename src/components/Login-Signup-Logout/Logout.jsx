import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class Logout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: this.props.isLogged
    };
  }

  handleLogout(event) {
    event.preventDefault();
    let url = 'http://localhost:9000/logout';
    fetch(url, {
      method: 'get',
      credentials: 'include'
    })
      .then((response) => response.text())
      .then((response) => {
        this.setState({
          isLogged: false
        });
        this.props.sendLoggedUser(this.state.isLogged);
        this.props.sendAlertMessage('danger', 'Wylogowano!', 'Użytkownik został wylogowany.');
      })
      .catch((err) => err);
  }

  render() {
    if (this.state.isLogged === false) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="container-fluid">
          <div className="row navbar-padding">
            <div className="col-lg-4"></div>
            <div className="col-lg-4 mt-5 componentBackgroundColor shadow-sm p-3 mb-5 bg-white rounded">
              <div className="card-body ">
                <div className="p-3 text-left">
                  <h5 className="card-title bigfont">Czy na pewno chcesz się wylogować?</h5>
                  <div className="loginSignupSubmitButton">
                    <button
                      className="btn btn-outline-primary"
                      onClick={(event) => this.handleLogout(event)}>
                      Wyloguj
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-4"></div>
          </div>
          <div className="row pt-4">
            <div className="col-lg-4"></div>
            <div className="col-lg-4">
              <Link className="btn btn-outline-secondary m-bot-10" to="/">
                {' '}
                <i className="fas fa-chevron-left"></i> Wróć do strony głównej
              </Link>
            </div>
            <div className="col-lg-4"></div>
          </div>
        </div>
      );
    }
  }
}

export default Logout;
