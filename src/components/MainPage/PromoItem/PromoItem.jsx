import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import './PromoItem.css';

const getMondaysDate = () => {
  const todaysDate = new Date();
  const todaysDay = todaysDate.getDay();
  const nextMonday = new Date();
  nextMonday.setDate(nextMonday.getDate() + ((7 - nextMonday.getDay()) % 7) + 1);
  nextMonday.setHours(0, 0, 0, 0);
  return nextMonday.getTime();
};
const getTomorrowsDate = () => {
  const todaysDate = new Date();
  const tomorrowDate = new Date(new Date().setDate(todaysDate.getDate()));
  tomorrowDate.setHours(24, 0, 0, 0);
  return tomorrowDate.getTime();
};

const getDays = (targetDate) => {
  const time = targetDate - Date.now();
  const days = Math.floor(time / 1000 / 60 / 60 / 24);
  return days;
};

const getHours = (targetDate) => {
  const time = targetDate - Date.now();
  const hours = Math.floor(time / 1000 / 60 / 60) % 24;
  return hours;
};

const getMinutes = (targetDate) => {
  const time = targetDate - Date.now();
  const minutes = Math.floor((time / 1000 / 60) % 60);
  return minutes;
};

const getSeconds = (targetDate) => {
  const time = targetDate - Date.now();
  const seconds = Math.floor((time / 1000) % 60);
  return seconds;
};

const PromoItem = ({ productData, promoType }) => {
  const [timeRemaining, setTimeRemaining] = useState({
    seconds: null,
    minutes: null,
    hours: null,
    days: null
  });
  const [targetDate, setTargetDate] = useState(null);

  const refreshTimer = useCallback(() => {
    const seconds = getSeconds(targetDate);
    const minutes = getMinutes(targetDate);
    const hours = getHours(targetDate);
    const days = getDays(targetDate);

    setTimeRemaining({
      seconds: seconds,
      minutes: minutes,
      hours: hours,
      days: days
    });
  }, [targetDate]);

  useEffect(() => {
    promoType === 'Weekly' ? setTargetDate(getMondaysDate) : setTargetDate(getTomorrowsDate);
  }, [promoType, refreshTimer]);

  useEffect(() => {
    refreshTimer();
    const interval = setInterval(() => refreshTimer(), 1000);
    return () => clearInterval(interval);
  }, [refreshTimer]);

  if (timeRemaining?.seconds === null || !productData) {
    return (
      <div className="col-sm-6">
        <div className="shadow bg-white rounded mb-4 ProductNavborder">
          <div className="pt-2 pb-2 d-block">
            <span className="fw-bold fs-2">Ładowanie...</span>
          </div>
          <div className="border-bottom border border-primary mb-3"></div>
          <div className="d-flex justify-content-center pt-5 pb-5">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="col-sm-6">
        <div className="shadow bg-white rounded mb-4 ProductNavborder">
          <Link className="promoText pointer" to={`/product/${productData.productID}`}>
            <div className="pt-2 pb-2">
              {promoType === 'Weekly' ? (
                <span className="fw-bold fs-3">Mega oferta tygodnia</span>
              ) : (
                <span className="fw-bold fs-3">Mega oferta dnia</span>
              )}
            </div>
            <div className="border-bottom border border-primary mb-3"></div>
            <div className="imageLink pointer mx-3 pb-3">
              <span className="fs-4 pointer fw-bold promoTitle">
                {productData.Manufacturer.manufacturerName}{' '}
                {productData.productName.replace(/ *\([^)]*\) */g, '')}
              </span>
            </div>

            <div className="row pb-3">
              <div className="col-sm-5">
                <div className="promoImageContainer position-relative">
                  <img
                    className="promoImage"
                    src={`${process.env.REACT_APP_API}${productData.Attributes[0].value}`}
                    alt="Zdjęcie produktu"
                  />
                  <div className="discountBadgeGroup">
                    <div className="discountBadge1"></div>
                    <div className="discountBadge2"></div>
                    <div className="discountBadge3"></div>
                    <div className="discountBadgeText">
                      <span className="discountText fs-5 fw-bold">
                        -{productData.promotionDiscount}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-7 d-flex flex-column">
                <div className="pt-3 px-3">
                  <div className="p-inline">
                    <span className="fs-5 text-dark float-left pb-3">Cena regularna:</span>
                    <span className="fs-4 text-dark float-right">
                      {productData.Prices[0].grossPrice.toLocaleString('pl-PL', {
                        minimumFractionDigits: 2
                      })}{' '}
                      zł
                    </span>
                  </div>
                  <div className="pt-5 p-inline">
                    <span className="fs-5 fw-bold float-left pb-3 pt-2">Cena tylko teraz:</span>
                    <span className="fs-4 fw-bold text-decoration-underline float-right">
                      {productData.Prices[1].grossPrice.toLocaleString('pl-PL', {
                        minimumFractionDigits: 2
                      })}{' '}
                      zł
                    </span>
                  </div>
                </div>

                <div className="pt-0 px-3">
                  <div className="row pt-0">
                    {productData.quantity !== 0 ? (
                      <div>
                        <span className="fs-5 fw-bold">
                          Pozostało sztuk:
                          <span className="fw-bold fs-5"> {productData.quantity}</span>
                        </span>
                        <div className="progress mb-3">
                          <div
                            className="progress-bar"
                            style={{ width: productData.quantity * 10 + '%' }}
                            role="progressbar"
                            aria-valuenow="2"
                            aria-valuemin="0"
                            aria-valuemax="10"></div>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <span className="fs-5 fw-bold"> Produkt wyprzedany</span>
                        <div className="progress mb-3">
                          <div
                            className="progress-bar w-0"
                            role="progressbar"
                            aria-valuenow="2"
                            aria-valuemin="0"
                            aria-valuemax="10"></div>
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="row mx-5">
                    <span className="fs-5 float-center">Pozostało czasu</span>
                  </div>
                  <div>
                    {promoType === 'Weekly' ? (
                      <div className="row mx-5">
                        <div className="col-1"></div>
                        <div className="col-2">
                          <span className="fs-5 fw-bold">
                            {timeRemaining.days.toLocaleString('en-US', {
                              minimumIntegerDigits: 2,
                              useGrouping: false
                            })}
                          </span>
                        </div>
                        <div className="col-2">
                          <span className="fs-5 fw-bold">
                            {timeRemaining.hours.toLocaleString('en-US', {
                              minimumIntegerDigits: 2,
                              useGrouping: false
                            })}
                          </span>
                        </div>
                        <div className="col-1">
                          <span className="fw-bold">:</span>
                        </div>
                        <div className="col-2">
                          <span className="fs-5 fw-bold">
                            {timeRemaining.minutes.toLocaleString('en-US', {
                              minimumIntegerDigits: 2,
                              useGrouping: false
                            })}
                          </span>
                        </div>
                        <div className="col-1">
                          <span className="fw-bold">:</span>
                        </div>
                        <div className="col-2">
                          <span className="fs-5 fw-bold">
                            {timeRemaining.seconds.toLocaleString('en-US', {
                              minimumIntegerDigits: 2,
                              useGrouping: false
                            })}
                          </span>
                        </div>
                        <div className="col-1"></div>
                      </div>
                    ) : (
                      <div className="row mx-5">
                        <div className="col-2"></div>
                        <div className="col-2">
                          <span className="fs-5 fw-bold">
                            {timeRemaining.hours.toLocaleString('en-US', {
                              minimumIntegerDigits: 2,
                              useGrouping: false
                            })}
                          </span>
                        </div>
                        <div className="col-1">
                          <span className="fw-bold">:</span>
                        </div>
                        <div className="col-2">
                          <span className="fs-5 fw-bold">
                            {timeRemaining.minutes.toLocaleString('en-US', {
                              minimumIntegerDigits: 2,
                              useGrouping: false
                            })}
                          </span>
                        </div>
                        <div className="col-1">
                          <span className="fw-bold">:</span>
                        </div>
                        <div className="col-2">
                          <span className="fs-5 fw-bold">
                            {timeRemaining.seconds.toLocaleString('en-US', {
                              minimumIntegerDigits: 2,
                              useGrouping: false
                            })}
                          </span>
                        </div>
                        <div className="col-2"></div>
                      </div>
                    )}
                  </div>
                  <div>
                    {promoType === 'Weekly' ? (
                      <div className="row mx-5">
                        <div className="col-1"></div>
                        <div className="col-2">
                          <span className="fs-6">dni</span>
                        </div>
                        <div className="col-2">
                          <span className="fs-6">godz.</span>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-2">
                          <span className="fs-6">min.</span>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-2">
                          <span className="fs-6 ">sek.</span>
                        </div>
                        <div className="col-1"></div>
                      </div>
                    ) : (
                      <div className="row mx-5">
                        <div className="col-2"></div>
                        <div className="col-2">
                          <span className="fs-6">godz.</span>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-2">
                          <span className="fs-6">min.</span>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-2">
                          <span className="fs-6">sek.</span>
                        </div>
                        <div className="col-2"></div>
                      </div>
                    )}
                  </div>
                </div>
                {productData.productsCount !== 0 ? (
                  <div className="mr-4 ml-4 pt-2 mt-auto">
                    <button className={`btn btn-primary btn-lg btn-block`}>
                      Sprawdź produkt <i className="fas fa-arrow-up-right-from-square"></i>
                    </button>
                  </div>
                ) : (
                  <div className="mr-4 ml-4 pt-2 mt-auto">
                    <button className={`btn btn-secondary btn-lg btn-block`}>
                      Sprawdź produkt <i className="fas fa-arrow-up-right-from-square"></i>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </div>
      </div>
    );
  }
};

export default PromoItem;
