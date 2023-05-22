import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProducts } from '../../store/storeSlices/productsSlice.js';
import newAlert from '../../features/newAlert';
import RefreshTimer from './RefreshTimer/RefreshTimer';
import PromoItem from './PromoItem/PromoItem';
import ListedProducts from './ListedProducts/ListedProducts.jsx';
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

const MainPage = ({ setSearchValueToSend }) => {
  const dispatch = useDispatch();
  const products = useSelector((state) => ({
    mostBoughtCategoryProducts: state.products.mostBoughtCategoryProducts,
    mostBoughtProducts: state.products.mostBoughtProducts,
    youMayLikeProducts: state.products.youMayLikeProducts,
    dailyPromoProduct: state.products.dailyPromoProduct,
    weeklyPromoProduct: state.products.weeklyPromoProduct,
    dailyDiscountProducts: state.products.dailyDiscountProducts
  }));

  const firstFetch = products?.mostBoughtCategoryProducts?.length === 0 ? true : false;
  const [isLoadingData, setIsLoadingData] = useState(firstFetch);
  const [error, setError] = useState(null);

  const handleFetchData = useCallback(async () => {
    const fetchData = async () => {
      try {
        const url = `${process.env.REACT_APP_API}/product/frontPageProducts`;
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
    const fetchedProducts = await fetchData();
    const refreshTimer = new Date().getTime();
    dispatch(
      updateProducts({
        mostBoughtCategoryProducts: fetchedProducts.mostBoughtCategoryProducts,
        mostBoughtProducts: fetchedProducts.mostBoughtProducts,
        youMayLikeProducts: fetchedProducts.youMayLikeProducts,
        dailyPromoProduct: fetchedProducts.dailyPromoProduct,
        weeklyPromoProduct: fetchedProducts.weeklyPromoProduct,
        dailyDiscountProducts: fetchedProducts.discountProducts,
        lastUpdate: refreshTimer
      })
    );

    if (fetchedProducts?.dailyPromoProduct?.productID) {
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
      {isLoadingData ? (
        <div className="d-flex justify-content-center pt-5 pb-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row">
          <PromoItem productData={products && products?.dailyPromoProduct} promoType={'Daily'} />
          <PromoItem productData={products && products?.weeklyPromoProduct} promoType={'Weekly'} />
        </div>
      )}
      {isLoadingData ? (
        <div className="d-flex justify-content-center pt-5 pb-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <ListedProducts
          products={products && products?.dailyDiscountProducts}
          productsTitle={'Dzisiaj przecenione produkty'}
          isLoadingData={isLoadingData}
          error={error}
        />
      )}
      {isLoadingData ? (
        <div className="d-flex justify-content-center pt-5 pb-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <ListedProducts
          products={products && products?.mostBoughtProducts}
          productsTitle={'Najcześciej kupowane produkty'}
          isLoadingData={isLoadingData}
          error={error}
        />
      )}
      {isLoadingData ? (
        <div className="d-flex justify-content-center pt-5 pb-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <ListedProducts
          products={products && products?.mostBoughtCategoryProducts}
          productsTitle={'Najcześciej kupowana kategoria'}
          isLoadingData={isLoadingData}
          error={error}
        />
      )}
      {isLoadingData ? (
        <div className="d-flex justify-content-center pt-5 pb-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <ListedProducts
          products={products && products?.youMayLikeProducts}
          productsTitle={'Może Ci się spodobać'}
          isLoadingData={isLoadingData}
          error={error}
        />
      )}
    </div>
  );
};

export default MainPage;
