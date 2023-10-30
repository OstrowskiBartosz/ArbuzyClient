import React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import './ProductSummary.css';

const ProductSummary = ({ productData, productID, blockUI, handleToCartClick, productLimit, isLogged }) => {
  return (
    <>
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
                    {attribute.value} {productData.Attributes[index].property.match(/\[(.*)\]/g)}
                  </span>
                </div>
              ) : null;
            })}
          </div>
          <HashLink smooth to={`/product/${productID}#productSpecification`}>
            <div className="text-left mb-3 mt-3 fw-bold pl-2 mt-2">
              <i className="fas fa-angle-double-down"></i> Przejdz do pełnej specyfikacji <i className="fas fa-angle-double-down"></i>
            </div>
          </HashLink>
        </div>
        <div className="col-xl-6">
          <div className="row pb-2 text-center">
            <div>
              <div>
                {productData.promotionName !== null ? (
                  <>
                    <span className="fs-5 fw-normal pt-2 text-decoration-line-through">
                      {productData.Prices[0].grossPrice.toLocaleString('pl-PL', {
                        minimumFractionDigits: 2
                      })}{' '}
                      zł
                    </span>
                    <span className="fs-2 fw-bold pt-2">
                      {' '}
                      {productData.Prices[productData.Prices.length - 1].grossPrice.toLocaleString('pl-PL', {
                        minimumFractionDigits: 2
                      })}{' '}
                      zł
                    </span>
                  </>
                ) : (
                  <span className="fs-3 fw-bold pt-2">
                    {productData.Prices[0].grossPrice.toLocaleString('pl-PL', {
                      minimumFractionDigits: 2
                    })}{' '}
                    zł
                  </span>
                )}
              </div>
              <div className="">
                {productData.promotionName !== null ? (
                  <div className="p-relative">
                    <span className="fs-6 fw-normal">
                      {productData.Prices[productData.Prices.length - 1].netPrice} zł +{' '}
                      {(
                        Number(productData.Prices[productData.Prices.length - 1].grossPrice) -
                        Number(productData.Prices[productData.Prices.length - 1].netPrice)
                      ).toLocaleString('pl-PL', { minimumFractionDigits: 2 })}{' '}
                      zł <span className="fw-bold">({productData.Prices[productData.Prices.length - 1].taxPercentage}% VAT)</span>
                    </span>
                    <div className="productDiscountBadgeGroup">
                      <div className="discountBadge1"></div>
                      <div className="discountBadge2"></div>
                      <div className="discountBadge3"></div>
                      <div className="discountBadgeText">
                        <span className="discountText fs-5 fw-bold">-{productData.promotionDiscount}%</span>
                      </div>
                    </div>
                  </div>
                ) : (
                  <span className="fs-6 fw-normal">
                    {productData.Prices[0].netPrice} zł +{' '}
                    {(Number(productData.Prices[0].grossPrice) - Number(productData.Prices[0].netPrice)).toLocaleString('pl-PL', {
                      minimumFractionDigits: 2
                    })}{' '}
                    zł <span className="fw-bold">({productData.Prices[0].taxPercentage}% VAT)</span>
                  </span>
                )}
              </div>
            </div>
          </div>
          <div className="row m-3">
            <div>
              {isLogged ? (
                productData.quantity > 0 ? (
                  productLimit ? (
                    <button className={'btn btn-danger btn-lg btn-block'}>Limit w koszyku :-(</button>
                  ) : blockUI ? (
                    <button className={'btn btn-warning btn-lg btn-block'}>
                      Dodawanie... <div className="spinner-border smallSpinner"></div>
                    </button>
                  ) : (
                    <button className={`btn btn-primary btn-lg btn-block`} id={productData.productID} onClick={(event) => handleToCartClick(event)}>
                      Dodaj do koszyka <i className="fas fa-cart-plus"></i>
                    </button>
                  )
                ) : (
                  <button className={'btn btn-danger btn-lg btn-block'} id={productData.productID}>
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
    </>
  );
};

export default ProductSummary;
