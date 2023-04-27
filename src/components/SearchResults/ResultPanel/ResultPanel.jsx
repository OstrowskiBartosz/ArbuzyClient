import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { updateCartItems } from '../../../store/storeSlices/cartItemsSlice';
import newAlert from '../../../features/newAlert';

import './ResultPanel.css';
import history from '../../history';

const ResultPanel = ({ isLoading, ProductsData, fetchSearchData }) => {
  const [blockUI, setblockUI] = useState(false);

  const isLogged = useSelector((state) => state.session.isLogged);

  const dispatch = useDispatch();

  const addNewAttribute = (event) => {
    const searchParams = new URLSearchParams(window.location.search);
    const clickedFilter = event.currentTarget.id.slice(6);
    searchParams.set(clickedFilter, 1);
    history.push(`${window.location.pathname}?${searchParams}`);
    window.scrollTo(0, 0);
    fetchSearchData();
  };

  const addNewFilter = (type, ID) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (searchParams.has(`filter${type}`)) {
      const URLFilterString = searchParams.get(`filter${type}`);
      const filterArray = JSON.parse(URLFilterString).map(Number);

      if (filterArray.indexOf(Number(ID)) === -1) {
        filterArray.push(Number(ID));
        searchParams.set(`filter${type}`, `[${[...filterArray]}]`);
      }
    } else {
      searchParams.set(`filter${type}`, `[${ID}]`);
    }
    history.push(`${window.location.pathname}?${searchParams}`);
    window.scrollTo(0, 0);
    fetchSearchData();
  };

  const handleToCartClick = (event) => {
    setblockUI(true);

    const data = {
      productID: event.currentTarget.id,
      quantity: 1
    };

    const url = `${process.env.REACT_APP_API}/cartItem`;
    fetch(url, {
      method: 'post',
      body: JSON.stringify(data),
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' }
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.message === 'Product has been added to cart.') {
          newAlert('primary', 'Dodano produkt', 'Produkt został dodany do koszyka.');
          dispatch(updateCartItems(true));
        } else if (response.message === 'Quantity limit.') {
          newAlert('danger', 'Limit produktu!', 'Limit sztuk produktu.');
        } else if (response.message === 'No active session.') {
          newAlert('danger', 'Zaloguj sie!', 'Zaloguj sie zeby dodac do koszyka!');
        } else {
          newAlert('danger', 'Wystąpił błąd.', 'Wystąpił nieoczekiwany błąd.');
          dispatch(updateCartItems(true));
        }
        setblockUI(false);
      })
      .catch((error) => error);
  };

  if (isLoading && ProductsData === undefined) {
    return (
      <div className="col-12 componentBackgroundColor mt-3 shadow p-3 mb-1 bg-white rounded">
        <div className="d-flex justify-content-center pt-5 pb-5 blockedUIScreen">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    );
  } else if ((ProductsData && ProductsData.length === 0) || ProductsData === null) {
    return (
      <div className="row">
        <div className="col-12 componentBackgroundColor mt-3 shadow p-3 bg-white rounded">
          <span className="fs-1 fw-bold text-center mt-5 mb-5 pt-5 pb-5">
            Nie ma takich produkt :-(
          </span>
        </div>
      </div>
    );
  } else {
    return (
      <>
        {ProductsData &&
          ProductsData.map((product) => (
            <div className="row" key={'produkt' + product.productID}>
              <div className="col-12 componentBackgroundColor mt-3 shadow p-3 bg-white rounded">
                <div
                  className={
                    isLoading ? 'row blockedUIScreenP opaciTySwitch' : 'row opaciTySwitch'
                  }>
                  <div className="col-xl-2 pr-0 mr-0">
                    <div className="image-container">
                      <img
                        className="center-Element-vertical feature_image"
                        alt="obraz produktu"
                        src={`${process.env.REACT_APP_API}${product.Attributes[2].value}`}></img>
                    </div>
                  </div>
                  <div className="col-xl-7">
                    <div className="font-weight-bold center-product-name">
                      <h4>
                        <Link
                          className="clear-link"
                          to={`/product/${product.productID}?searchURL=${window.location.search}`}>
                          {product.Manufacturer.manufacturerName + ' ' + product.productName}
                        </Link>
                      </h4>
                    </div>
                    <div className="row">
                      <div className="col-4">
                        <div className="idProduktu d-block">
                          <span>id produktu: {product.productID}</span>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="idProduktu d-block">
                          <span>id kategorii: {product.Category.categoryID}</span>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className="idProduktu d-block">
                          <span>id producenta: {product.Manufacturer.manufacturerID}</span>
                        </div>
                      </div>
                    </div>

                    <div className="d-inline text-left">
                      <ul>
                        <li className="mt-3">
                          <span className="d-inline">Producent:</span>

                          <span
                            className="font-weight-bold pl-2 attributeHover"
                            onClick={(event) =>
                              addNewFilter('Manufacturer', product.Manufacturer.manufacturerID)
                            }>
                            {product.Manufacturer.manufacturerName}
                          </span>
                        </li>

                        <li className="mb-3">
                          <span className="d-inline">Kategoria:</span>

                          <span
                            className="font-weight-bold pl-2 attributeHover"
                            onClick={(event) =>
                              addNewFilter('Category', product.Category.categoryID)
                            }>
                            {product.Category.categoryName}
                          </span>
                        </li>

                        {product.Attributes.map((attribute) =>
                          attribute.property !== 'image' ? (
                            <div
                              className="d-block"
                              key={'produkt' + product.productID + '-w' + attribute.property}>
                              <li>
                                <span className="d-inline">{attribute.property}:</span>
                                <span
                                  id={`Resultgroup_F${attribute.property}value_F${attribute.value}`}
                                  className="font-weight-bold pl-2 attributeHover"
                                  onClick={(event) => addNewAttribute(event)}>
                                  {attribute.value}
                                </span>
                              </li>
                            </div>
                          ) : null
                        )}
                      </ul>
                    </div>
                  </div>
                  <div className="col-xl-3">
                    <div className="placement-bottomAddToCart"></div>
                    <div className="fw-bold fs-1 text-center mt-3 mb-3">
                      <span>
                        {product.Prices[0].grossPrice.toFixed(2).replace('.', ',') + ' zł'}
                      </span>
                    </div>
                    <div className="mb-2 mt-2 text-center fs-5">
                      <span>Dostępne sztuki:</span>
                      <span className="fw-bold"> {product.quantity}</span>
                    </div>
                    <div>
                      {isLogged ? (
                        product.quantity > 0 ? (
                          blockUI ? (
                            <button
                              className={`btn btn-primary btn-lg btn-block`}
                              id={product.productID}
                              disabled>
                              Dodaj do koszyka <i className="fas fa-cart-plus"></i>
                            </button>
                          ) : (
                            <button
                              className={`btn btn-primary btn-lg btn-block`}
                              id={product.productID}
                              onClick={(event) => handleToCartClick(event)}>
                              Dodaj do koszyka <i className="fas fa-cart-plus"></i>
                            </button>
                          )
                        ) : (
                          <button className={'btn btn-danger btn-lg btn-block'} disabled>
                            Brak produktu
                          </button>
                        )
                      ) : (
                        <Link to="/login">
                          <button className={'btn btn-danger btn-lg btn-block'}>
                            Zaloguj sie <i className="bigicon fas fa-sign-in-alt"></i>
                          </button>
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </>
    );
  }
};

export default ResultPanel;
