import React, { useCallback } from 'react';
import { Link, Redirect, withRouter, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import newAlert from '../../features/newAlert';
import './Profile.css';
import Orders from './Orders/Orders.jsx';
import Complaints from './Complaints/Complaints.jsx';
import Settings from './Settings/Settings.jsx';
import MoveBack from '../../features/additionalComponents/MoveBack/MoveBack';

const Profile = (props) => {
  let { tabName } = useParams();
  const [activeTab, setActiveTab] = useState('');

  const [isLoadingUser, setIsLoadingUser] = useState(true);
  const [userData, setUserData] = useState({});

  const [isLoadingInvoice, setIsLoadingInvoice] = useState(true);
  const [invoiceData, setInvoiceData] = useState([]);

  const [error, setError] = useState(null);

  const isLogged = useSelector((state) => state.session.isLogged);

  const fetchInvoiceData = useCallback(async () => {
    try {
      setIsLoadingInvoice(true);
      const url = `${process.env.REACT_APP_API}/invoice`;
      const response = await fetch(url, { method: 'get', credentials: 'include' });
      const json = await response.json();
      setInvoiceData(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingInvoice(false);
    }
  }, []);

  const fetchUserData = useCallback(async () => {
    try {
      setIsLoadingUser(true);
      const url = `${process.env.REACT_APP_API}/user`;
      const response = await fetch(url, { method: 'get', credentials: 'include' });
      const json = await response.json();
      setUserData(json.data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoadingUser(false);
    }
  }, []);

  const handleTabChange = (event) => {
    switch (event.currentTarget.id) {
      case 'orders-btn':
        setActiveTab('orders');
        break;
      case 'complaints-btn':
        setActiveTab('complaints');
        break;
      case 'settings-btn':
        setActiveTab('settings');
        break;
      default:
        setActiveTab('orders');
    }
  };

  useEffect(() => {
    if (isLogged) {
      fetchInvoiceData();
      fetchUserData();
    }

    return () => {
      if (isLogged === false) {
        newAlert('danger', 'Zaloguj się!', 'Zaloguj się, żeby zobaczyć swój profil.');
      }
    };
  }, [isLogged, fetchInvoiceData, fetchUserData]);

  useEffect(() => {
    setActiveTab(
      tabName === 'orders' || tabName === 'complaints' || tabName === 'settings'
        ? tabName
        : 'orders'
    );
  }, [tabName]);

  if (isLogged === false) {
    return <Redirect to="/login" />;
  } else if (isLoadingUser || isLoadingInvoice || error) {
    return (
      <>
        <div className="container options shadow-sm bg-white rounded mb-5">
          <div className="d-flex flex-wrap">
            <div className="col">
              <Link to="/profile/orders">
                <button
                  id="orders-btn"
                  className="btn btn-primary option"
                  onClick={(event) => handleTabChange(event)}>
                  <i className="fa fa-shopping-bag"></i> Zamówienia
                </button>
              </Link>
            </div>
            <div className="col">
              <Link to="/profile/complaints">
                <button
                  id="complaints-btn"
                  className="btn btn-primary option"
                  onClick={(event) => handleTabChange(event)}>
                  <i className="fa fa-share-square"></i> Reklamacje
                </button>
              </Link>
            </div>
            <div className="col">
              <Link to="/profile/settings">
                <button
                  id="settings-btn"
                  className="btn btn-primary option"
                  onClick={(event) => handleTabChange(event)}>
                  <i className="fas fa-cog"></i> Ustawienia
                </button>
              </Link>
            </div>
          </div>
          <div>
            {(isLoadingUser || isLoadingInvoice) && (
              <div className="d-flex justify-content-center pt-5 pb-5">
                <div className="spinner-border" role="status">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            )}
            {error && (
              <div className="d-flex justify-content-center pt-5 pb-5">
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
        <MoveBack moveBackText="Wróć do strony głównej" moveBackURL="/" />
      </>
    );
  } else {
    return (
      <>
        <div className="container options shadow-sm bg-white rounded">
          <div className="d-flex flex-wrap">
            <div className="col">
              <Link to="/profile/orders">
                <button
                  id="orders-btn"
                  className="btn btn-primary option"
                  onClick={(event) => handleTabChange(event)}>
                  <i className="fa fa-shopping-bag"></i> Zamówienia
                </button>
              </Link>
            </div>
            <div className="col">
              <Link to="/profile/complaints">
                <button
                  id="complaints-btn"
                  className="btn btn-primary option"
                  onClick={(event) => handleTabChange(event)}>
                  <i className="fa fa-share-square"></i> Reklamacje
                </button>
              </Link>
            </div>
            <div className="col">
              <Link to="/profile/settings">
                <button
                  id="settings-btn"
                  className="btn btn-primary option"
                  onClick={(event) => handleTabChange(event)}>
                  <i className="fas fa-cog"></i> Ustawienia
                </button>
              </Link>
            </div>
          </div>
          <div>
            {activeTab === 'orders' && (
              <Orders
                invoiceData={invoiceData}
                isLoadingInvoice={isLoadingInvoice}
                setError={setError}
                fetchInvoiceData={fetchInvoiceData}></Orders>
            )}
            {activeTab === 'complaints' && <Complaints></Complaints>}
            {activeTab === 'settings' && (
              <Settings
                userData={userData}
                isLoadingUser={isLoadingUser}
                fetchUserData={fetchUserData}
                setError={setError}></Settings>
            )}
          </div>
        </div>
        <MoveBack moveBackText="Wróć do strony głównej" moveBackURL="/" />
      </>
    );
  }
};

export default withRouter(Profile);
