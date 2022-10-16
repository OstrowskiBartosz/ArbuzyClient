import React from 'react';
import { useState, useEffect, useRef } from 'react';
import './MessageAlert.css';

const MessageAlert = (props) => {
  const [alertArray, setAlertArray] = useState([]);
  const alertArrayRef = useRef(alertArray);

  const newAlert = () => {
    if (props.alertCounter !== 0) {
      const setTimeoutHandler = setTimeout(removeAlert, 7000, props.alertCounter);
      const messageAlert = {
        alertHeading: props.alertHeading,
        alertText: props.alertText,
        alertColor: props.alertColor,
        alertNumber: props.alertCounter,
        alertShow: true,
        alertTimeOut: setTimeoutHandler
      };
      setAlertArray([...alertArray, messageAlert]);
    }
  };

  const mouseOverAlert = (alertNumber) => {
    const alertIndex = alertArray.findIndex((element) => element.alertNumber === alertNumber);
    clearTimeout(alertArray[alertIndex].alertTimeOut);
  };

  const mouseOutAlert = (alertNumber) => {
    const alertIndex = alertArrayRef.current.findIndex(
      (element) => element.alertNumber === alertNumber
    );
    const newArray = alertArrayRef.current;
    let messageAlert = newArray[alertIndex];
    newArray.splice(alertIndex, 1);
    const setTimeoutHandler = setTimeout(removeAlert, 6900, alertNumber);
    messageAlert.alertTimeOut = setTimeoutHandler;
    newArray.splice(alertIndex, 0, messageAlert);
    setAlertArray(newArray);
  };

  const removeAlert = (alertNumber) => {
    const alertIndex = alertArrayRef.current.findIndex(
      (element) => element.alertNumber === alertNumber
    );
    let splicedAlertArray = alertArrayRef.current;
    splicedAlertArray.splice(alertIndex, 1);
    setAlertArray([...splicedAlertArray]);
  };

  useEffect(() => {
    alertArrayRef.current = alertArray;
  }, [alertArray]);

  useEffect(() => {
    newAlert();
  }, [props.alertCounter]);

  return (
    <div>
      {alertArray.map((alert, index) => (
        <div
          key={`${alert.alertNumber}`}
          className={`alert alertWidth alert-${alert.alertColor} `}
          style={{ top: 85 + 60 * index }}
          onMouseOver={() => mouseOverAlert(alert.alertNumber)}
          onMouseOut={() => mouseOutAlert(alert.alertNumber)}>
          <span className="font-weight-bold hideOnSmall">{alert.alertHeading}</span>
          <span className="pl-3">{alert.alertText}</span>
          <span
            className="float-right cursor-pointer pl-3"
            onClick={() => removeAlert(alert.alertNumber)}>
            &times;
          </span>
        </div>
      ))}
    </div>
  );
};

export default MessageAlert;
