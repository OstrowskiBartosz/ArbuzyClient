import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';

const getMinutes = (lastRefreshRef) => {
  const time = new Date(lastRefreshRef.current + 300000).getTime() - Date.now();
  const minutes = Math.floor((time / 1000 / 60) % 60);
  return minutes;
};

const getSeconds = (lastRefreshRef) => {
  const time = new Date(lastRefreshRef.current + 300000).getTime() - Date.now();
  const seconds = Math.floor((time / 1000) % 60);
  return seconds;
};

const RefreshTimer = ({ handleFetchData }) => {
  const lastUpdate = useSelector((state) => state.products.lastUpdate);
  const [refreshTime, setRefreshTime] = useState(lastUpdate ?? new Date().getTime());
  const lastRefreshDateRef = useRef(refreshTime);
  const [minutes, setMinutes] = useState(getMinutes(lastRefreshDateRef));
  const [seconds, setSeconds] = useState(getSeconds(lastRefreshDateRef));

  const refreshTimer = useCallback(() => {
    const minutes = getMinutes(lastRefreshDateRef);
    const seconds = getSeconds(lastRefreshDateRef);
    setMinutes(minutes);
    setSeconds(seconds);
    if (minutes <= 0 && seconds <= 0) {
      handleFetchData();
      setRefreshTime(new Date().getTime());
    }
  }, [handleFetchData]);

  useEffect(() => {
    const interval = setInterval(() => refreshTimer(), 1000);
    return () => clearInterval(interval);
  }, [refreshTimer]);

  useEffect(() => {
    lastRefreshDateRef.current = refreshTime;
  }, [refreshTime]);

  useEffect(() => {
    setRefreshTime(lastUpdate);
  }, [lastUpdate]);

  return (
    <div className="row">
      <div className="col-xl-9"></div>
      <div className="col-xl-3">
        <div className="bg-white rounded text-left pl-3">
          <span className="fs-5">Aut. Odświeżenie za: </span>
          <span className="fw-bold fs-5">
            {minutes.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false
            })}
          </span>
          :
          <span className="fw-bold fs-5">
            {seconds.toLocaleString('en-US', {
              minimumIntegerDigits: 2,
              useGrouping: false
            })}
          </span>
          <span className="float-right mt-1 pr-2">
            <i className="fa fa-refresh refreshButton fs-5" onClick={() => handleFetchData()}></i>
          </span>
        </div>
      </div>
    </div>
  );
};

export default RefreshTimer;
