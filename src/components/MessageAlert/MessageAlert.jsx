import React, { useCallback } from 'react';
import { useState, useEffect, useRef } from 'react';
import './MessageAlert.css';

import { useSelector, useDispatch } from 'react-redux';
import {
  addOngoingAlerts,
  removeOngoingAlert,
  mouseOverOngoingAlert,
  mouseOutOngoingAlert
} from '../../store/storeSlices/messageAlertsSlice';

const MessageAlert = (props) => {
  const ongoingAlerts = useSelector((state) => state.alertMessage.messageAlerts);
  const newAlert = useSelector((state) => state.alertMessage.newAlert);
  const dispatch = useDispatch();
  const ongoingAlertsRef = useRef(ongoingAlerts);

  const removeAlert = useCallback(
    (alertNumber) => {
      const alertIndex = ongoingAlertsRef.current.findIndex((e) => e.alertNumber === alertNumber);
      dispatch(removeOngoingAlert(alertIndex));
    },
    [dispatch]
  );

  const addNewAlert = useCallback(
    (newAlert) => {
      const { alertText, alertNumber } = newAlert;
      if (alertText !== '' && !ongoingAlerts.some((el) => el.alertNumber === alertNumber)) {
        const newMessageAlert = {
          alertHeading: newAlert.alertHeading,
          alertText: newAlert.alertText,
          alertColor: newAlert.alertColor,
          alertNumber: newAlert.alertNumber,
          alertTimeOut: setTimeout(removeAlert, 7000, newAlert.alertNumber)
        };
        dispatch(addOngoingAlerts(newMessageAlert));
      }
    },
    [dispatch, removeAlert, ongoingAlerts]
  );

  const mouseOverAlert = (alertNumber) => {
    const alertIndex = ongoingAlerts.findIndex((element) => element.alertNumber === alertNumber);
    clearTimeout(ongoingAlerts[alertIndex].alertTimeOut);
    dispatch(mouseOverOngoingAlert(alertIndex));
  };

  const mouseOutAlert = (alertNumber) => {
    const alertIndex = ongoingAlertsRef.current.findIndex((e) => e.alertNumber === alertNumber);
    const newTimeoutHandler = setTimeout(removeAlert, 7000, alertNumber);
    dispatch(mouseOutOngoingAlert({ alertIndex, newTimeoutHandler }));
  };

  useEffect(() => {
    ongoingAlertsRef.current = ongoingAlerts;
  }, [ongoingAlerts]);

  useEffect(() => {
    addNewAlert(newAlert);
  }, [newAlert, newAlert.alertNumber, addNewAlert]);

  return (
    <div>
      {ongoingAlerts.map((alert, index) => (
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
