import React from 'react';
import { useState, useEffect } from 'react';
import { Link, withRouter, useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useSelector } from 'react-redux';
import newAlert from '../../features/newAlert';

import './Product.css';

import { useDispatch } from 'react-redux';
import { updateCartItems } from '../../store/storeSlices/cartItemsSlice';

const splitProductDesc = async (description) => {
  description.forEach((part, index) => {
    if (part.startsWith('http')) {
      description[index] = <img className="img-fluid" src={part} alt="product description" />;
    }
  });
  return description;
};

const getURLFromParam = () => {
  const params = new URLSearchParams(window.location.search);
  const URLParam = params.get('searchURL') ?? null;
  return URLParam;
};

const Product = (props) => {
  const { productID } = useParams();
  const searchURL = getURLFromParam();

  const [productData, setProductData] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [error, setError] = useState(null);
  const [blockUI, setBlockUI] = useState(false);

  const [currentImage, setCurrentImage] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productLimit, setProductLimit] = useState(false);

  const isLogged = useSelector((state) => state.session.isLogged);
  const dispatch = useDispatch();

  const imageClick = (image) => {
    setCurrentImage(`${image}`);
  };

  const handleToCartClick = (event) => {
    event.persist();
    event.preventDefault();
    setBlockUI(true);
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
          setProductLimit(true);
        } else if (response.message === 'No active session.') {
          newAlert('danger', 'Zaloguj sie!', 'Zaloguj sie zeby dodac do koszyka!');
        } else {
          newAlert('danger', 'Wystąpił błąd.', 'Wystąpił nieoczekiwany błąd.');
          dispatch(updateCartItems(true));
        }
        setBlockUI(false);
      })
      .catch((error) => error);
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const url = `${process.env.REACT_APP_API}/product/${productID}`;
        const response = await fetch(url, { method: 'get', credentials: 'include' });
        const json = await response.json();

        const productDescription = await splitProductDesc(json.data.description.split('|'));
        const mainImageIndex = json.data.Attributes.findIndex((ele) => Number(ele.type) === 2);
        setProductData(json.data);
        setError(null);
        setIsLoadingProduct(false);
        setProductDescription(productDescription);
        setCurrentImage(json.data.Attributes[mainImageIndex].value);
      } catch (err) {
        setError(err.message);
        setProductData(null);
      } finally {
        setIsLoadingProduct(false);
      }
    };

    fetchProductData();
  }, [productID]);

  if (isLoadingProduct || error) {
    return (
      <div className="container options shadow-sm bg-white rounded mb-5">
        <div className="d-flex justify-content-center pt-5 pb-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          {error ? (
            <div className="pt-5" id="error">
              Error: {error}
            </div>
          ) : null}
        </div>
      </div>
    );
  } else {
    return (
      <>
        <div className="container-fluid" id="top">
          <div className="row navbar-padding">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              <div className="row">
                <div className="col-12 mt-5 componentBackgroundColor mt-3 mb-3 shadow-sm bg-white rounded">
                  <div className="row">
                    <div className="col product-tree ml-2 mt-3">
                      <Link
                        className=" fw-bold"
                        to={`/search?filterCategory=[${productData.Category.categoryID}]&s=domyślne&p=1&l=10`}>
                        {productData.Category.categoryName}{' '}
                      </Link>
                      <i className="fas fa-long-arrow-alt-right"></i>{' '}
                      <Link
                        className="fw-bold"
                        to={`/search?filterManufacturer=[${productData.Manufacturer.manufacturerID}]&s=domyślne&p=1&l=10`}>
                        {productData.Manufacturer.manufacturerName}{' '}
                      </Link>
                      <i className="fas fa-long-arrow-alt-right"></i>{' '}
                      <Link
                        className=" fw-bold"
                        to={`/search?q=${productData.productName}&s=domyślne&p=1&l=10`}>
                        {productData.productName}{' '}
                      </Link>
                    </div>
                  </div>
                  <div className="dropdown-divider mt-4 mb-4"></div>
                  <div className="row">
                    <div className="col-xl-1 mb-5">
                      <div className="col-thumbnail">
                        {productData.Attributes.map((attribute, index) => {
                          return attribute.property === 'image' ? (
                            <div className="image-thumbnail subimage-container" key={index}>
                              <img
                                className="img-thumbnail image"
                                src={`${process.env.REACT_APP_API}${attribute.value}`}
                                alt="Zdjęcie produktu"
                                onClick={() => imageClick(attribute.value)}
                              />
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                    <div className="col-xl-3">
                      <div className="main-image">
                        <img
                          className="img-thumbnail max-size d-block ml-auto mr-auto"
                          src={`${process.env.REACT_APP_API}/${currentImage}`}
                          alt="Zdjęcie produktu"
                        />
                      </div>
                    </div>
                    <div className="col-xl-8">
                      <div className="product-name pl-2">
                        <h2>
                          {productData.Manufacturer.manufacturerName} {productData.productName}
                        </h2>
                      </div>
                      <div className="product-id text-muted pl-2">
                        <span>Id produktu: {productData.productID}</span>
                      </div>
                      <div className="row pb-5">
                        <div className="col-xl-6">
                          <div className="text-left mb-3 pl-2 fs-5 fw-bold">
                            <span>Główne parametry produktu:</span>
                          </div>
                          <div>
                            {productData.Attributes.map((attribute, index) => {
                              return Number(attribute.type) === 1 ? (
                                <div className="left pl-2" key={index}>
                                  {attribute.property}:{' '}
                                  <span className="fw-bold">
                                    {attribute.value}{' '}
                                    {productData.Attributes[index].property.match(/\[(.*)\]/g)}
                                  </span>
                                </div>
                              ) : null;
                            })}
                          </div>
                          <HashLink smooth to={`/product/${productID}#productSpecification`}>
                            <div className="text-left mb-3 mt-3 fw-bold pl-2 mt-2">
                              <i className="fas fa-angle-double-down"></i> Przejdz do pełnej
                              specyfikacji <i className="fas fa-angle-double-down"></i>
                            </div>
                          </HashLink>
                        </div>
                        <div className="col-xl-6">
                          <div className="row pb-2 text-center">
                            <div>
                              <div>
                                <span className="fs-1 fw-bold pt-2">
                                  {productData.Prices[0].grossPrice.toLocaleString('pl-PL', {
                                    minimumFractionDigits: 2
                                  })}{' '}
                                  zł
                                </span>
                              </div>
                              <div className="">
                                <span className="fs-6 fw-normal">
                                  {productData.Prices[0].netPrice} zł +{' '}
                                  {(
                                    Number(productData.Prices[0].grossPrice) -
                                    Number(productData.Prices[0].netPrice)
                                  ).toLocaleString('pl-PL', { minimumFractionDigits: 2 })}{' '}
                                  zł{' '}
                                  <span className="fw-bold">
                                    ({productData.Prices[0].taxPercentage}% VAT)
                                  </span>
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="row m-3">
                            <div>
                              {isLogged ? (
                                productData.quantity > 0 ? (
                                  productLimit ? (
                                    <button className={'btn btn-danger btn-lg btn-block'}>
                                      Limit w koszyku :-(
                                    </button>
                                  ) : blockUI ? (
                                    <button className={'btn btn-warning btn-lg btn-block'}>
                                      Dodawanie...{' '}
                                      <div className="spinner-border smallSpinner"></div>
                                    </button>
                                  ) : (
                                    <button
                                      className={`btn btn-primary btn-lg btn-block`}
                                      id={productData.productID}
                                      onClick={(event) => handleToCartClick(event)}>
                                      Dodaj do koszyka <i className="fas fa-cart-plus"></i>
                                    </button>
                                  )
                                ) : (
                                  <button
                                    className={'btn btn-danger btn-lg btn-block'}
                                    id={productData.productID}>
                                    chwilowy brak produktu
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
                            <div className="left pl-2 mt-2 fs-4 text-center">
                              <span>Dostępne sztuki: </span>
                              <span className="fw-bold">{productData.quantity}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-divider mt-4 mb-4"></div>
                  <div id="productDescription" className="mt-5 mb-5 text-center">
                    <div className="fs-1 fw-bold mb-5">
                      <span>Opis produktu</span>
                    </div>
                    <div className="row m-bot-10 ml-2 mr-2">
                      <div className="col-xl-12 mb-5">
                        {productDescription.map((part, index) => {
                          if (typeof part !== 'string') {
                            return (
                              <div className="mb-5" key={index}>
                                {part}
                              </div>
                            );
                          } else {
                            return (
                              <span className="mb-3" key={index}>
                                {part}
                              </span>
                            );
                          }
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="dropdown-divider mt-4 mb-4"></div>
                  <div id="productSpecification" className="mt-5 mb-5 text-center">
                    <h1>Pełna specyfikacja</h1>
                    <div className="row m-bot-10 mt-5">
                      <span className="text-center fw-bold fs-5 mb-2">Dane produktu</span>
                      <div className="col col-left">
                        <span>Nazwa produktu:</span>
                        <span>Producent:</span>
                        <span>Kod produktu producenta:</span>
                        <span className="pb-4">Kategoria produktu:</span>
                      </div>
                      <div className="col col-right">
                        <span className="fw-bold">{productData.productName}</span>
                        <span className="fw-bold">{productData.Manufacturer.manufacturerName}</span>
                        <span className="fw-bold">
                          {productData.productName.match(/\(([^)]+)\)/g)}
                        </span>
                        <span className="fw-bold  pb-4">{productData.Category.categoryName}</span>
                      </div>

                      <span className="text-center fw-bold fs-5 mb-2 ">Specyfikacja produktu</span>
                      <div className="col col-left">
                        {productData.Attributes.map((attribute, index) => {
                          return Number(attribute.type) === 1 ? (
                            <div key={index}>
                              {attribute.property.replace(/\[(.*)\]/g, '') + ':'}
                            </div>
                          ) : null;
                        })}
                        {productData.Attributes.map((attribute, index) => {
                          return Number(attribute.type) === 0 ? (
                            <div key={index}>
                              {attribute.property.replace(/\[(.*)\]/g, '') + ':'}
                            </div>
                          ) : null;
                        })}
                      </div>
                      <div className="col col-right">
                        {productData.Attributes.map((attribute, index) => {
                          return Number(attribute.type) === 1 ? (
                            <div key={index}>
                              <span className="fw-bold">
                                {attribute.value}{' '}
                                {productData.Attributes[index].property.match(/\[(.*)\]/g)}
                              </span>
                            </div>
                          ) : null;
                        })}
                        {productData.Attributes.map((attribute, index) => {
                          return Number(attribute.type) === 0 ? (
                            <div key={index}>
                              <span className="fw-bold">
                                {attribute.value}{' '}
                                {productData.Attributes[index].property.match(/\[(.*)\]/g)}
                              </span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-xl-5"></div>
                    <div className="col-xl-2">
                      <HashLink smooth to={`/product/${productID}#top`}>
                        <div className="border-bottom border border-primary">
                          <div className=" text-center mt-2 mb-2">
                            wróć do góry <i className="fas fa-arrow-up"></i>
                          </div>
                        </div>
                      </HashLink>
                    </div>
                    <div className="col-xl-5"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-sm-2"></div>
          </div>
        </div>
        <div className="container">
          <div className="row pt-4 mb-5">
            <div className="col-lg-6 pb-5">
              <Link className="btn btn-outline-secondary m-bot-10" to="/">
                <i className="fas fa-chevron-left"></i>
                <i className="fas fa-chevron-left"></i> Wróć do strony głównej
              </Link>
            </div>
            {searchURL !== null ? (
              <div className="col-lg-6">
                <Link className="btn btn-outline-primary" to={`/search${searchURL}`}>
                  <i className="fas fa-chevron-left"></i> Wróć do wyników wyszukiwania
                </Link>
              </div>
            ) : null}
            <div className="col-lg-2"></div>
          </div>
        </div>
      </>
    );
  }
};

export default withRouter(Product);
