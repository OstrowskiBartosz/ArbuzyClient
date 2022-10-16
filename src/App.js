import React from 'react';
import Cookies from 'js-cookie';

import Navbar from './components/Navbar/Navbar.jsx';

import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogged: null,
      hasExpired: false,
      showSearchHints: false
    };
  }

  componentDidMount() {
    this.fetchLoggedUser();
  }

  fetchLoggedUser() {
    if (undefined !== Cookies.get('user_sid')) {
      let url = 'http://localhost:9000/session';
      fetch(url, {
        method: 'get',
        credentials: 'include',
        headers: new Headers({ 'content-type': 'application/json' })
      })
        .then((response) => response.text())
        .then((response) => {
          if (response === 'logged') {
            this.setState({
              isLogged: true
            });
          } else {
            this.setState({
              isLogged: false,
              hasExpired: true
            });
          }
        })
        .catch((err) => err);
    } else {
      this.setState({
        isLogged: false,
        hasExpired: false
      });
    }
  }

  render() {
    return (
      <div className="App">
        <Navbar isLogged={this.state.isLogged} hasExpired={this.state.hasExpired} />
      </div>
    );
  }
}

export default App;
