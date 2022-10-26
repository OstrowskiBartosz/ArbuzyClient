import React from 'react';

const Complaints = (props) => {
  return (
    <div className={'container complaints'}>
      <div className="row">
        <div className="col mt-3 mb-3">
          <h1>Reklamacje w sklepie Arbuzy.com</h1>
        </div>
      </div>
      <div className="row">
        <div className="col left">
          <p>
            W celu złożenia reklamacji w sklepie Arbuzy.com należy wysłać reklamowany towar na
            adres:
          </p>
          <p className="pb-0 mb-0 pt-0 mt-0">Arbuzy.com</p>
          <p className="pb-0 mb-0 pt-0 mt-0">Dział Obsługi Reklamacji</p>
          <p className="pb-0 mb-0 pt-0 mt-0">ul. Owocowa 16/5b</p>
          <p className="pb-0 mb-0 pt-0 mt-0">12-123 Warszawa</p>
          <p className="fw-bold mt-3 pb-0 mb-0">
            Do paczki powinien zostać dołączony numer zamówienia, którego dotyczy przesyłana
            reklamacja.
          </p>
          <p className="mb-4">
            Towar powinien zostać zapakowany w bezpieczny sposób, aby nie uległ uszkodzeniu podczas
            wysyłki. Za wszelkie uszkodzenia wynikłe z tego tytułu odpowiada kupujący.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Complaints;
