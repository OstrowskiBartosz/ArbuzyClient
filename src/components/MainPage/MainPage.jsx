import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProducts } from '../../store/storeSlices/productsSlice.js';
import newAlert from '../../features/newAlert';
import RefreshTimer from './RefreshTimer/RefreshTimer';
import PromoItem from './PromoItem/PromoItem';
import './MainPage.css';

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

const productData = {
  Attributes: [{ value: '/images/products/13/1695259_2_i1064.jpg' }],
  Manufacturer: { manufacturerName: 'Seagate' },
  Prices: [{ grossPrice: 264.4, promoPrice: 235.2 }],
  productID: 13,
  productName: 'Barracuda Pro 1 TB 2.5" SATA III (ST1000LM049)',
  productsCount: 2
};

const MainPage = ({ setSearchValueToSend }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => ({
    mostBoughtCategoryProducts: state.products.mostBoughtCategoryProducts,
    mostBoughtProducts: state.products.mostBoughtProducts,
    youMayLikeProducts: state.products.youMayLikeProducts
  }));

  const firstFetch = products?.mostBoughtCategoryProducts?.length === 0 ? true : false;
  const [isLoadingData, setIsLoadingData] = useState(firstFetch);
  const [error, setError] = useState(null);

  const handleFetchData = useCallback(async () => {
    const fetchData = async (resource) => {
      try {
        const url = `${process.env.REACT_APP_API}/product/${resource}`;
        const response = await fetch(url, { method: 'get', credentials: 'include' });
        if (response.status === 400 || response.status === 500)
          throw new Error('Ooops, nie udało się pobrać elementów!');
        const json = await response.json();
        return json.data;
      } catch (err) {
        setError(err.message);
      }
    };

    setIsLoadingData(true);
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

    if (mostBoughtCategoryProducts && mostBoughtProducts && youMayLikeProducts) {
      setIsLoadingData(false);
      newAlert('primary', 'Odświeżono!', 'Produkty zostały odświeżone.');
    }
  }, [dispatch]);

  useEffect(() => {
    if (firstFetch) handleFetchData();
  }, [handleFetchData, firstFetch]);

  return (
    <div className="container mainpage mb-5 text-center">
      <div className="shadow bg-white rounded mb-4 ProductNavborder">
        <div className="categoryHeader mb-3 pt-3">Kategorie Produktów</div>
        <div className="border-bottom border border-primary"></div>
        <div className="pb-3">
          <div className="d-flex flex-row justify-content-around flex-wrap mt-3 pb-3">
            <div className="categoryLink categoryText">
              <Link
                className="clear-link"
                to={`/search?filterCategory=[]`}
                onClick={() => {
                  setSearchValueToSend('');
                }}>
                Wszystkie produkty
              </Link>
            </div>
          </div>
          {categoryList.map((categoryGroup, index) => (
            <div
              key={`group${index}`}
              className="d-flex flex-row justify-content-around flex-wrap mt-2 pb-1">
              {categoryGroup.map((category, index2) => (
                <div key={`c${index2}`} className="categoryLink pl-4 pr-4 pb-2 categoryText">
                  <Link
                    className="clear-link"
                    to={`/search?filterCategory=[${category.categoryID}]`}
                    onClick={() => {
                      setSearchValueToSend('');
                    }}>
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
        handleFetchData={handleFetchData}
      />

      <div className="row">
        <PromoItem productData={productData} promoType={'Daily'} />
        <PromoItem productData={productData} promoType={'Weekly'} />
      </div>

      <div className="shadow bg-white rounded mb-4">
        <div className="categoryHeader mb-3 pt-3 display-inlineblock">
          Najczęściej Kupowane Produkty
        </div>
        <div className="border-bottom border border-primary"></div>
        {isLoadingData ? (
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
        {error && (
          <div className="d-flex justify-content-center pt-5 pb-5">
            <span>{error}</span>
          </div>
        )}
      </div>
      <div className="shadow bg-white rounded mb-4">
        <div className="categoryHeader mb-3 pt-3">Najczęściej Kupowana Kategoria</div>
        <div className="border-bottom border border-primary"></div>
        {isLoadingData ? (
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
        {error && (
          <div className="d-flex justify-content-center pt-5 pb-5">
            <span>{error}</span>
          </div>
        )}
      </div>
      <div className="shadow bg-white rounded mb-4">
        <div className="categoryHeader mb-3 pt-3">Może Ci się spodobać</div>
        <div className="border-bottom border border-primary"></div>
        {isLoadingData ? (
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
        {error && (
          <div className="d-flex justify-content-center pt-5 pb-5">
            <span>{error}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainPage;
