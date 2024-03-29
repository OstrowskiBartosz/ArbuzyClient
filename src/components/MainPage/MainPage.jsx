import React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { updateProducts } from '../../store/storeSlices/productsSlice.js';
import newAlert from '../../features/newAlert';
import RefreshTimer from './RefreshTimer/RefreshTimer';
import PromoItem from './PromoItem/PromoItem';
import ListedProducts from './ListedProducts/ListedProducts';
import { getData } from '../../features/sharableMethods/httpRequests';
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
  let products = {};
  products.mostBoughtCategoryProducts = useSelector((state) => state.products.mostBoughtCategoryProducts);
  products.mostBoughtProducts = useSelector((state) => state.products.mostBoughtProducts);
  products.youMayLikeProducts = useSelector((state) => state.products.youMayLikeProducts);
  products.dailyPromoProduct = useSelector((state) => state.products.dailyPromoProduct);
  products.weeklyPromoProduct = useSelector((state) => state.products.weeklyPromoProduct);
  products.dailyDiscountProducts = useSelector((state) => state.products.dailyDiscountProducts);

  const firstFetch = products && products?.mostBoughtCategoryProducts?.length === 0 ? true : false;
  const [isLoadingData, setIsLoadingData] = useState(firstFetch);
  const [error, setError] = useState(null);

  const handleFetchData = useCallback(async () => {
    const fetchData = async () => {
      try {
        const endpoint = `product/frontPageProducts`;
        const fetch = await getData(endpoint);
        const response = await fetch.json();
        return response.data;
      } catch (err) {
        setError(err.message);
      }
    };

    setIsLoadingData(true);
    const fetchedProducts = await fetchData();
    const refreshTimer = new Date().getTime();
    dispatch(
      updateProducts({
        mostBoughtCategoryProducts: fetchedProducts?.mostBoughtCategoryProducts,
        mostBoughtProducts: fetchedProducts?.mostBoughtProducts,
        youMayLikeProducts: fetchedProducts?.youMayLikeProducts,
        dailyPromoProduct: fetchedProducts?.dailyPromoProduct,
        weeklyPromoProduct: fetchedProducts?.weeklyPromoProduct,
        dailyDiscountProducts: fetchedProducts?.discountProducts,
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
      <div className="shadow bg-white rounded mb-4 ProductNavborder pb-3">
        <div className="fs-4 fw-bold mb-3 pt-3">Kategorie Produktów</div>
        <div className="border-bottom border border-primary"></div>
        <div className="d-flex flex-row justify-content-around flex-wrap pt-2 mb-1">
          <div className="fs-5 fw-bold pb-1">
            <Link
              className="clear-link"
              to={`/search?filterCategory=[]`}
              onClick={() => {
                setSearchValueToSend('');
              }}>
              Wszystkie kategorie
            </Link>
          </div>
        </div>
        <div className="d-flex flex-row justify-content-around">
          {categoryList.map((categoryGroup, index) => (
            <div key={`group${index}`}>
              {categoryGroup.map((category, index2) => (
                <div key={`c${index2}`} className="fs-5 fw-bold p-2">
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
      {error && (
        <div className="d-flex justify-content-center pt-5 pb-5">
          <span>{error}</span>
        </div>
      )}
      <RefreshTimer dataTopCategory={products && products?.mostBoughtCategoryProducts} handleFetchData={handleFetchData} />
      {isLoadingData ? (
        <div className="d-flex justify-content-center pt-5 pb-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="sub-container">
          <div className="row">
            <PromoItem productData={products && products?.dailyPromoProduct} promoType={'Daily'} />
            <PromoItem productData={products && products?.weeklyPromoProduct} promoType={'Weekly'} />
          </div>
        </div>
      )}

      {isLoadingData ? (
        <div className="d-flex justify-content-center pt-5 pb-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="sub-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shadow bg-white rounded ProductNavborder mb-1">
                <div className="pt-3 mb-3 text-center position-relative">
                  <div className="fs-4 fw-bold text-center">Dzisiaj przecenione produkty</div>
                </div>
              </div>
            </div>
          </div>
          <ListedProducts
            listedID={'dailyDiscountProducts'}
            products={products && products?.dailyDiscountProducts}
            isLoadingData={isLoadingData}
            topSold={false}
            error={error}
          />
        </div>
      )}

      {isLoadingData ? (
        <div className="d-flex justify-content-center pt-5 pb-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="sub-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shadow bg-white rounded ProductNavborder mb-1">
                <div className="pt-3 mb-3 text-center position-relative">
                  <div className="fs-4 fw-bold text-center">Najczęściej kupowane produkty</div>
                </div>
              </div>
            </div>
          </div>
          <ListedProducts
            listedID={'mostBoughtProducts'}
            products={products && products?.mostBoughtProducts}
            isLoadingData={isLoadingData}
            topSold={true}
            error={error}
          />
        </div>
      )}

      {isLoadingData ? (
        <div className="d-flex justify-content-center pt-5 pb-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="sub-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shadow bg-white rounded ProductNavborder mb-1">
                <div className="pt-3 mb-3 text-center position-relative">
                  <div className="fs-4 fw-bold text-center">Najczęściej kupowana kategoria</div>
                </div>
              </div>
            </div>
          </div>
          <ListedProducts
            listedID={'mostBoughtCategoryProducts'}
            products={products && products?.mostBoughtCategoryProducts}
            isLoadingData={isLoadingData}
            topSold={true}
            error={error}
          />
        </div>
      )}

      {isLoadingData ? (
        <div className="d-flex justify-content-center pt-5 pb-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="sub-container">
          <div className="row">
            <div className="col-lg-12">
              <div className="shadow bg-white rounded ProductNavborder mb-1">
                <div className="pt-3 mb-3 text-center position-relative">
                  <div className="fs-4 fw-bold text-center">Może Ci się spodobać</div>
                </div>
              </div>
            </div>
          </div>
          <ListedProducts
            listedID={'youMayLikeProducts'}
            products={products && products?.youMayLikeProducts}
            isLoadingData={isLoadingData}
            topSold={false}
            error={error}
          />
        </div>
      )}
    </div>
  );
};

export default MainPage;
