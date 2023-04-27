import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LogIn from './LogIn/LogIn';
import SignUp from './SignUp/SignUp';
import MoveBack from '../../features/additionalComponents/MoveBack/MoveBack';

import './AuthenticationPanel.css';

const AuthenticationPanel = ({ redirect }) => {
  const isLogged = useSelector((state) => state.session.isLogged);
  const [activeLogin, setActiveLogin] = useState(true);
  const [activeSignup, setActiveSignup] = useState(false);

  const handleSLChange = (event) => {
    if (event.target.id === 'SignUp') {
      setActiveSignup(true);
      setActiveLogin(false);
    } else if (event.target.id === 'LogIn') {
      setActiveSignup(false);
      setActiveLogin(true);
    }
  };

  if (isLogged === true) {
    if (redirect === '/login') {
      return <Redirect to="/" />;
    }
    return <Redirect to={redirect} />;
  } else {
    return (
      <>
        <div className="container-fluid">
          <div className="row navbar-padding">
            <div className="col-xl-4"></div>
            <div className="col-xl-4 mt-5 componentBackgroundColor shadow p-3 mb-5 bg-white rounded">
              <div className="card-body text-center">
                <div
                  id="LogIn"
                  className={'outlinetab col-lg-6 ' + (activeLogin ? ' activeTab' : '')}
                  onClick={(event) => handleSLChange(event)}>
                  Logowanie
                </div>
                <div
                  id="SignUp"
                  className={'outlinetab col-lg-6 ' + (activeSignup ? ' activeTab' : '')}
                  onClick={(event) => handleSLChange(event)}>
                  Rejestracja
                </div>
              </div>
              {activeLogin ? <LogIn /> : null}
              {activeSignup ? <SignUp /> : null}
            </div>
            <div className="col-xl-4"></div>
          </div>
        </div>
        <MoveBack moveBackText="Wróć do strony głównej" moveBackURL="/" />
      </>
    );
  }
};

export default AuthenticationPanel;
