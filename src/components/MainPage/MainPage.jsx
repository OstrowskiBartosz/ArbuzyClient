import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProducts } from '../../store/storeSlices/productsSlice.js';
import newAlert from '../../features/newAlert';
import RefreshTimer from './RefreshTimer/RefreshTimer';
import './MainPage.css';

const MainPage = (props) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => ({
    mostBoughtCategoryProducts: state.products.mostBoughtCategoryProducts,
    mostBoughtProducts: state.products.mostBoughtProducts,
    youMayLikeProducts: state.products.youMayLikeProducts
  }));

  const [isLoadingTopCategory, setIsLoadingTopCategory] = useState(
    products.mostBoughtCategoryProducts.length === 0 ? true : false
  );
  const [isLoadingTopProducts, setIsLoadingTopProducts] = useState(
    products.mostBoughtProducts.length === 0 ? true : false
  );
  const [isLoadingYouMayLike, setIsLoadingMayLike] = useState(
    products.youMayLikeProducts.length === 0 ? true : false
  );

  const categoryList = [
    [
      { categoryName: 'Dyski HDD', categoryID: 1 },
      { categoryName: 'Dyski SSD', categoryID: 2 },
      { categoryName: 'Karty graficzne', categoryID: 3 }
    ],
    [
      { categoryName: 'Napędy optyczne', categoryID: 4 },
      { categoryName: 'Obudowy', categoryID: 5 },
      { categoryName: 'Pamieci RAM', categoryID: 6 }
    ],
    [
      { categoryName: 'Płyty główne', categoryID: 7 },
      { categoryName: 'Procesory', categoryID: 8 },
      { categoryName: 'Zasilacze', categoryID: 9 }
    ]
  ];

  const fetchData = useCallback(async (resource) => {
    const url = `${process.env.REACT_APP_API}/product/${resource}`;
    const response = await fetch(url, { method: 'get', credentials: 'include' });
    const json = await response.json();
    return json.data;
  }, []);

  const handleRefresh = useCallback(async () => {
    setIsLoadingTopCategory(true);
    setIsLoadingTopProducts(true);
    setIsLoadingMayLike(true);
    const [mostBoughtCategoryProducts, mostBoughtProducts, youMayLikeProducts] = await Promise.all([
      fetchData('mostBoughtCategoryProducts'),
      fetchData('mostBoughtProducts'),
      fetchData('youMayLikeThisProducts')
    ]);
    const refreshTimer = new Date().getTime();
    dispatch(
      updateProducts({
        mostBoughtCategoryProducts: mostBoughtCategoryProducts,
        mostBoughtProducts: mostBoughtProducts,
        youMayLikeProducts: youMayLikeProducts,
        lastUpdate: refreshTimer
      })
    );
    newAlert('primary', 'Odświeżono!', 'Produkty zostały odświeżone.');
    setIsLoadingTopCategory(false);
    setIsLoadingTopProducts(false);
    setIsLoadingMayLike(false);
  }, [fetchData, dispatch]);

  useEffect(() => {
    if (products.mostBoughtCategoryProducts.length === 0) handleRefresh();
  }, [handleRefresh, products]);

  return (
    <div className="container mainpage mb-5 text-center">
      <div className="container shadow-sm bg-white rounded mb-4">
        <div className="categoryHeader mb-3 pt-3">Wszystkie Kategorie</div>
        <div className="pb-3">
          {categoryList.map((categoryGroup, index) => (
            <div
              key={`group${index}`}
              className="d-flex flex-row justify-content-around flex-wrap mt-3 pb-3">
              {categoryGroup.map((category, index2) => (
                <div key={`c${index2}`} className="categoryLink pl-4 pr-4 pb-2 categoryText">
                  <Link
                    className="clear-link"
                    to={`/search?filterCategory=[${category.categoryID}]`}>
                    {category.categoryName}
                  </Link>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      <RefreshTimer
        dataTopCategory={products.mostBoughtCategoryProducts}
        handleRefresh={handleRefresh}
      />
      <div className="container shadow-sm bg-white rounded mb-4">
        <div className="categoryHeader mb-3 pt-3 display-inlineblock">
          Najczęściej Kupowane Produkty
        </div>
        <hr />
        {isLoadingTopProducts ? (
          <div className="d-flex justify-content-center pt-5 pb-5">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {products.mostBoughtProducts.map((product, index) => (
              <div key={index} className="col imageCol">
                <Link className="clear-link" to={'/product/' + product.productID}>
                  <div className="row imageRow">
                    <img
                      className="imageSmall"
                      src={`${process.env.REACT_APP_API}${product.Attributes[0].value}`}
                      alt="Zdjęcie produktu"
                    />
                  </div>
                  <div className="row pb-2">
                    <span className="fw-bold fs-3">
                      {product.Prices[0].grossPrice.toLocaleString('pl-PL', {
                        minimumFractionDigits: 2
                      })}{' '}
                      zł
                    </span>
                  </div>
                  <div className="row imageLink">
                    <span className="fs-7 pointer">
                      {product.Manufacturer.manufacturerName} {product.productName}
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
        {isLoadingTopCategory ? (
          <div className="d-flex justify-content-center pt-5 pb-5">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {products.mostBoughtCategoryProducts.map((product, index) => (
              <div key={index} className="col imageCol">
                <Link className="clear-link" to={'/product/' + product.productID}>
                  <div className="row imageRow">
                    <img
                      className="imageSmall"
                      src={`${process.env.REACT_APP_API}${product.Attributes[0].value}`}
                      alt="Zdjęcie produktu"
                    />
                  </div>
                  <div className="row pb-2">
                    <span className="fw-bold fs-3">
                      {product.Prices[0].grossPrice.toLocaleString('pl-PL', {
                        minimumFractionDigits: 2
                      })}{' '}
                      zł
                    </span>
                  </div>
                  <div className="row imageLink">
                    <span className="fs-7 pointer">
                      {product.Manufacturer.anufacturerName} {product.productName}
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
        {isLoadingYouMayLike ? (
          <div className="d-flex justify-content-center pt-5 pb-5">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <div className="row">
            {products.youMayLikeProducts.map((product, index) => (
              <div key={index} className="col imageCol">
                <Link className="clear-link pointer" to={'/product/' + product.productID}>
                  <div className="row imageRow">
                    <img
                      className="imageSmall"
                      src={`${process.env.REACT_APP_API}${product.Attributes[0].value}`}
                      alt="Zdjęcie produktu"
                    />
                  </div>

                  <div className="row pb-2">
                    <span className="fw-bold fs-3">
                      {product.Prices[0].grossPrice.toLocaleString('pl-PL', {
                        minimumFractionDigits: 2
                      })}{' '}
                      zł
                    </span>
                  </div>
                  <div className="row imageLink pointer">
                    <span className="fs-7 pointer">
                      {product.Manufacturer.manufacturerName} {product.productName}
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
};

export default MainPage;
