import React from 'react';
import { Link } from 'react-router-dom';
import './PageFooter.css';

class PageFooter extends React.Component {
  render() {
    return (
      <footer>
        <div className="text-center">
          <Link to={'/'}>
            <span className="fw-bold fs-5">Strona główna</span>
          </Link>
          <span className="pl-2 pr-2 fs-5">|</span>
          <Link to={'/profile'}>
            <span className="fw-bold fs-5 mb-2">Profil</span>
          </Link>
          <span className="pl-2 pr-2 fs-5">|</span>
          <Link to={'/cart'}>
            <span className="fw-bold fs-5 mb-2">Koszyk</span>
          </Link>
        </div>
        <div className="footer-element">
          <span className="footer-element-header fw-bold fs-4 pb-2">
            Sklep komputerowy Arbuzy.com
          </span>
          <span className="footer-element-text">
            Arbuzy.com to jeden z największych i najpopularniejszych sklepów komputerowych w Polsce.
            W szerokiej ofercie sklepu można znaleźć wysokiej klasy laptopy, komputery na każdą
            kieszeń, wydajne podzespoły komputerowe oraz urządzenia peryferyjne. Szeroka oferta
            urządzeń, akcesoriów i podzespołów umożliwia skonfigurowanie i zakup komputerów o
            optymalnej wydajności i atrakcyjnej cenie. W asortymencie sklepu nie brak również
            sprzętów dla graczy – to ergonomiczne i precyzyjne myszki i klawiatury, wysokiej klasy
            słuchawki, wydajne karty graficzne, nowoczesne procesory i komfortowe fotele gamingowe.
            Szeroka oferta produktów i ich bardzo duża dostępność to kwestie, które sprawiają, że
            zakupy są szybkie i wygodne, a na zamówione sprzęty i akcesoria komputerowe nie trzeba
            długo czekać.
          </span>
        </div>
        <div className="footer-element">
          <span className="footer-element-header fw-bold fs-4 pb-2">
            Najlepszy sprzęt komputerowy
          </span>
          <span className="footer-element-text">
            Sklep komputerowy Arbuzy.com oferuje największy w Polsce podzespołów komputerowych. Tak
            zróżnicowana oferta produktów z wielu kategorii stwarza możliwość wyszukania i
            dopasowania sprzętów do oczekiwań nabywców, a unikatowe promocje są szansą na jeszcze
            tańsze zakupy.
          </span>
        </div>
        <div className="footer-element">
          <span className="footer-element-header fw-bold fs-4 pb-2 pt-2">
            Niskie ceny, wysoka jakość obsługi, szybka dostawa
          </span>
          <span className="footer-element-text">
            Dopasowanie oferty do potrzeb i oczekiwań kupujących to tylko jeden z wielu atutów
            sklepu Arbuzy.net. Asortyment sklepu jest bardzo mocno zróżnicowany pod względem cen,
            dlatego każdy znajdzie w nim coś dla siebie. Niskie ceny idą w parze z wysoką jakością
            obsługi oraz z szybką realizacją zamówień. Zakupione produkty są dostarczane różnymi
            metodami wysyłkowymi.
          </span>
        </div>
        <div className="footer-element-copyright pb-4">
          <span className="footer-element-copyright-text">Copyright © 2021-2022 Arbuzy.com</span>
        </div>
      </footer>
    );
  }
}

export default PageFooter;
