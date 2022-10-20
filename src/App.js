import React from 'react';
import Cookies from 'js-cookie';
import Navbar from './components/Navbar/Navbar.jsx';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { sessionChange } from './store/storeSlices/sessionSlice.js';

import './App.css';

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchLoggedUser = () => {
      if (undefined !== Cookies.get('user_sid')) {
        let url = `${process.env.REACT_APP_API}/session`;
        fetch(url, {
          method: 'get',
          credentials: 'include',
          headers: new Headers({ 'content-type': 'application/json' })
        })
          .then((response) => response.text())
          .then((response) => {
            if (response === 'Logged.') {
              dispatch(sessionChange(true));
            } else {
              dispatch(sessionChange(false));
            }
          })
          .catch((err) => err);
      } else {
        dispatch(sessionChange(false));
      }
    };

    fetchLoggedUser();
  }, [dispatch]);

  return (
    <div className="App">
      <Navbar />
    </div>
  );
};

export default App;
