import React from 'react';
import { useHistory } from 'react-router-dom';

const DeliveryTable = ({ userData }) => {
  let history = useHistory();

  const handleProfileClick = (event) => {
    event.preventDefault();
    history.push(`/profile/settings`);
  };

  return (
    <>
      <span className="mb-2 mt-4 fw-bold text-left">
        <span className="fs-4">Dane dostawy</span>
      </span>
      <table className="table table-hover mb-0">
        <thead className="thead-light">
          <tr>
            <th className="fw-bold">Imie i nazwisko</th>
            <th className="fw-bold">Miejsce dostawy</th>
            {userData.companyName ? <th className="fw-bold">Nazwa Firmy</th> : null}
          </tr>
        </thead>
        <tbody className="table-striped">
          <tr
            className="cursor-pointer"
            key={userData.firstName}
            onClick={(e) => handleProfileClick(e)}>
            <td className="fw-bold">{`${userData.firstName} ${userData.lastName}`}</td>
            <td className="fw-bold">{`${userData.cityName} ul. ${userData.streetName} ${userData.ZIPCode}`}</td>
            {userData.companyName ? (
              <td className="fw-bold">
                {userData.companyName === null ? '' : userData.companyName}
              </td>
            ) : null}
          </tr>
        </tbody>
      </table>
      <div className="border-bottom border border-primary"></div>
    </>
  );
};

export default DeliveryTable;
