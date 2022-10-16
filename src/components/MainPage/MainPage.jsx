import React from 'react';
// import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Link } from 'react-router-dom';
// import Baner1 from "../images/baner1.png";
// import Baner2 from "../images/baner2.png";
// import Baner3 from "../images/baner3.png";
// import Baner4 from "../images/baner4.png";
import './MainPage.css';

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    let url = 'http://localhost:9000/';
    fetch(url, {
      method: 'post',
      credentials: 'include'
    })
      .then((response) => response.text())
      .then((response) => {
        var responseObject = JSON.parse(response);
        this.setState({
          response: responseObject,
          isLoading: false
        });
      })
      .catch((err) => err);
  }

  render() {
    return (
      <div className="container mainpage mb-5">
        <div className="container shadow-sm bg-white rounded mb-4">
          <div className="categoryHeader mb-3 pt-3">Wszystkie Kategorie</div>
          <div className="d-flex flex-row justify-content-around flex-wrap mt-3">
            <div id="3" className="categoryLink pl-4 pr-4 pb-2 categoryText">
              <Link className="clear-link" to={'/search?w=Karty%20graficzne'}>
                Karty graficzne
              </Link>
            </div>
            <div id="8" className="categoryLink pl-4 pr-4 pb-2 categoryText">
              <Link className="clear-link" to={'/search?w=Procesory'}>
                Procesory
              </Link>
            </div>
            <div id="7" className="categoryLink pl-4 pr-4 pb-2 categoryText">
              <Link className="clear-link" to={'/search?w=Płyty%20główne'}>
                Płyty główne
              </Link>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-around flex-wrap mt-3">
            <div id="6" className="categoryLink pl-4 pr-4 pb-2 categoryText">
              <Link className="clear-link" to={'/search?w=Pamięci%20RAM'}>
                Pamięci RAM
              </Link>
            </div>
            <div id="1" className="categoryLink pl-4 pr-4 pb-2 categoryText">
              <Link className="clear-link" to={'/search?w=Dyski HDD'}>
                Dyski HDD
              </Link>
            </div>
            <div id="2" className="categoryLink pl-4 pr-4 pb-2 categoryText">
              <Link className="clear-link" to={'/search?w=Dyski%20SSD'}>
                Dyski SSD
              </Link>
            </div>
          </div>
          <div className="d-flex flex-row justify-content-around flex-wrap mt-3">
            <div id="5" className="categoryLink pl-4 pr-4 pb-2 categoryText">
              <Link className="clear-link" to={'/search?w=Obudowy'}>
                Obudowy
              </Link>
            </div>
            <div id="9" className="categoryLink pl-4 pr-4 pb-2 categoryText">
              <Link className="clear-link" to={'/search?w=Zasilacze'}>
                Zasilacze
              </Link>
            </div>
            <div id="4" className="categoryLink pl-4 pr-4 pb-3 categoryText">
              <Link className="clear-link" to={'/search?w=Napędy%20optyczne'}>
                Napędy optyczne
              </Link>
            </div>
          </div>
        </div>
        {/* <div className="col corouselCol shadow-sm bg-white rounded">
                <Carousel
                  autoPlay
                  showIndicators={false}
                  showStatus={false}
                  emulateTouch
                  infiniteLoop>
                  <div>
                    <img src={Baner1} alt="Baner reklamowy" />
                  </div>
                  <div>
                    <img src={Baner2} alt="Baner reklamowy" />
                  </div>
                  <div>
                    <img src={Baner3} alt="Baner reklamowy" />
                  </div>
                  <div>
                    <img src={Baner4} alt="Baner reklamowy" />
                  </div>
                </Carousel>
              </div> */}
        <div className="container shadow-sm bg-white rounded mb-4">
          <div className="categoryHeader mb-3 pt-3">Najczęściej Kupowane Produkty</div>
          <hr />
          {this.state.isLoading ? (
            <div className="d-flex justify-content-center pt-5 pb-5">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row">
              {this.state.response.kupowane.map((produkt, index) => (
                <div key={index} className="col imageCol">
                  <Link className="clear-link" to={'/product/' + produkt.id_produktu}>
                    <div className="row imageRow">
                      <img className="imageSmall" src={produkt.wartosc} alt="Zdjęcie produktu" />
                    </div>
                    <div className="row pb-2">
                      <span className="fw-bold fs-3">
                        {produkt.cena_brutto.toLocaleString('pl-PL', {
                          minimumFractionDigits: 2
                        })}{' '}
                        zł
                      </span>
                    </div>
                    <div className="row imageLink">
                      <span className="fs-7 pointer">
                        {produkt.nazwa_producenta} {produkt.nazwa_produktu}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="container shadow-sm bg-white rounded mb-4">
          <div className="categoryHeader mb-3 pt-3">Najczęściej Kupowana Kategoria</div>
          <hr />
          {this.state.isLoading ? (
            <div className="d-flex justify-content-center pt-5 pb-5">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row">
              {this.state.response.kupowane.map((produkt, index) => (
                <div key={index} className="col imageCol">
                  <Link className="clear-link" to={'/product/' + produkt.id_produktu}>
                    <div className="row imageRow">
                      <img className="imageSmall" src={produkt.wartosc} alt="Zdjęcie produktu" />
                    </div>
                    <div className="row pb-2">
                      <span className="fw-bold fs-3">
                        {produkt.cena_brutto.toLocaleString('pl-PL', {
                          minimumFractionDigits: 2
                        })}{' '}
                        zł
                      </span>
                    </div>
                    <div className="row imageLink">
                      <span className="fs-7 pointer">
                        {produkt.nazwa_producenta} {produkt.nazwa_produktu}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
        <div className="container shadow-sm bg-white rounded mb-4">
          <div className="categoryHeader mb-3 pt-3">Może Ci się spodobać</div>
          <hr />
          {this.state.isLoading ? (
            <div className="d-flex justify-content-center pt-5 pb-5">
              <div className="spinner-border" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          ) : (
            <div className="row">
              {this.state.response.polecane.map((produkt, index) => (
                <div key={index} className="col imageCol">
                  <Link className="clear-link pointer" to={'/product/' + produkt.id_produktu}>
                    <div className="row imageRow">
                      <img className="imageSmall" src={produkt.wartosc} alt="Zdjęcie produktu" />
                    </div>

                    <div className="row pb-2">
                      <span className="fw-bold fs-3">
                        {produkt.cena_brutto.toLocaleString('pl-PL', {
                          minimumFractionDigits: 2
                        })}{' '}
                        zł
                      </span>
                    </div>
                    <div className="row imageLink pointer">
                      <span className="fs-7 pointer">
                        {produkt.nazwa_producenta} {produkt.nazwa_produktu}
                      </span>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default MainPage;
