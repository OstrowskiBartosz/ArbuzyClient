import React from 'react';
import { useState, useEffect } from 'react';
import { Link, withRouter, useParams } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { useSelector } from 'react-redux';
import newAlert from '../../features/newAlert';
import ScrollToTop from '../../features/additionalComponents/scrollToTop/scrollToTop.jsx';
import './Product.css';
import history from '../history';
import { useDispatch } from 'react-redux';
import { updateCartItems } from '../../store/storeSlices/cartItemsSlice';
import { getData, postData } from '../../features/sharableMethods/httpRequests';

import ProductDescription from './ProductDescription/ProductDescription';
import ProductSummary from './ProductSummary/ProductSummary';
import ProductSpecification from './ProductSpecification/ProductSpecification';
import ProductNavbar from './ProductNavbar/ProductNavbar';

const scrollWithOffset = (el) => {
  const yCoordinate = el.getBoundingClientRect().top + window.pageYOffset;
  const yOffset = -130;
  window.scrollTo({ top: yCoordinate + yOffset, behavior: 'smooth' });
};

const getURLFromParam = () => {
  const params = new URLSearchParams(window.location.search);
  const URLParam = decodeURIComponent(params.toString().slice(13)) ?? null;
  history.replace(`${window.location.pathname}`);
  return URLParam;
};

const Product = ({ setSearchValueToSend }) => {
  const { productID } = useParams();
  const [searchURL, setSearchURL] = useState(getURLFromParam());

  const [productData, setProductData] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(true);
  const [error, setError] = useState(null);
  const [blockUI, setBlockUI] = useState(false);

  const [currentImage, setCurrentImage] = useState('');
  const [productLimit, setProductLimit] = useState(false);

  const isLogged = useSelector((state) => state.session.isLogged);
  const dispatch = useDispatch();

  const imageClick = (image) => {
    setCurrentImage(`${image}`);
  };

  const handleToCartClick = async (event) => {
    try {
      event.persist();
      event.preventDefault();
      setBlockUI(true);
      const productData = {
        productID: event.currentTarget.id,
        quantity: 1
      };
      const fetch = await postData('cartItem', productData);
      const response = await fetch.json();
      if (fetch.ok) {
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
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err);
    } finally {
      setBlockUI(false);
    }
  };

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        const endpoint = `product/${productID}`;
        const fetch = await getData(endpoint);
        const response = await fetch.json();

        const mainImageIndex = response.data.Attributes.findIndex((ele) => Number(ele.type) === 2);
        setProductData(response.data);
        setError(null);
        setIsLoadingProduct(false);
        setCurrentImage(response.data.Attributes[mainImageIndex].value);
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
      <div className="container options shadow bg-white rounded mb-5">
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
          <div className="row navbar-padding containerProdct">
            <div className="col-sm-2"></div>
            <div className="col-sm-8">
              <div className="row">
                <div className="col-12 mt-5 componentBackgroundColor mt-3 mb-3 shadow bg-white rounded">
                  <div className="row" id="productSummary">
                    <div className="col product-tree ml-2 mt-3">
                      <Link
                        className=" fw-bold"
                        to={`/search?filterCategory=[${productData.Category.categoryID}]&s=domyślne&p=1&l=10`}
                        onClick={() => setSearchValueToSend('')}>
                        {productData.Category.categoryName}{' '}
                      </Link>
                      <i className="fas fa-long-arrow-alt-right"></i>{' '}
                      <Link
                        className="fw-bold"
                        to={`/search?filterManufacturer=[${productData.Manufacturer.manufacturerID}]&s=domyślne&p=1&l=10`}
                        onClick={() => setSearchValueToSend('')}>
                        {productData.Manufacturer.manufacturerName}{' '}
                      </Link>
                      <i className="fas fa-long-arrow-alt-right"></i>{' '}
                      <Link
                        className=" fw-bold"
                        to={`/search?q=${productData.productName}&s=domyślne&p=1&l=10`}
                        onClick={() => setSearchValueToSend(productData.productName)}>
                        {productData.productName}
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
                      <div className="main-image w-100 h-100 ml-2">
                        <img
                          className="img-thumbnail max-size d-block ml-auto mr-auto"
                          src={`${process.env.REACT_APP_API}/${currentImage}`}
                          alt="Zdjęcie produktu"
                        />
                      </div>
                    </div>
                    <div className="col-xl-8">
                      <ProductSummary
                        productData={productData}
                        productID={productID}
                        blockUI={blockUI}
                        handleToCartClick={handleToCartClick}
                        productLimit={productLimit}
                        isLogged={isLogged}
                      />
                    </div>
                  </div>

                  <ProductNavbar productID={productID} scrollWithOffset={scrollWithOffset} />

                  <div className="dropdown-divider mt-0 mb-4"></div>
                  <ProductDescription rawDescription={productData.description} />
                  <div className="dropdown-divider mt-4 mb-4"></div>
                  <ProductSpecification productData={productData} />

                  <div className="row mb-2">
                    <div className="col-xl-5"></div>
                    <div className="col-xl-2">
                      <HashLink smooth to={`/product/${productID}#top`} scroll={(el) => scrollWithOffset(el)}>
                        <div className="ProductNavborder">
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
                <ScrollToTop>
                  <Link className="btn btn-outline-primary" to={`/search?${searchURL}`}>
                    <i className="fas fa-chevron-left"></i> Wróć do wyników wyszukiwania
                  </Link>
                </ScrollToTop>
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
