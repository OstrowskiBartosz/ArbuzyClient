import React from 'react';
import { Link } from 'react-router-dom';

const ProductTable = ({ cartData }) => {
  return (
    <>
      <span className="mb-2 fw-bold text-left">
        <span className="fs-4">Zamawiane przedmioty</span>
      </span>
      <table className="table table-hover mb-0">
        <thead className="thead-light">
          <tr>
            <th className="fw-bold">Nazwa produktu</th>
            <th className="fw-bold text-center">Cena za sztukę</th>
            <th className="fw-bold text-center">Ilość</th>
            <th className="fw-bold text-center">Łączna cena</th>
          </tr>
        </thead>
        <tbody className="table-striped">
          {cartData.cartItemsData.map((cartItem) => (
            <tr className="cursor-pointer" key={cartItem.Product.productID}>
              <td className="fw-bold">
                <Link to={`/product/${cartItem.Product.productID}`}>
                  {`${cartItem.Product.Manufacturer.manufacturerName} ${cartItem.Product.productName}`}
                </Link>
              </td>
              <td className="fw-bold text-center">
                {cartItem.Product.promotionName !== null ? (
                  <div>
                    <span className="text-decoration-line-through fw-normal">
                      {String(cartItem.Product.Prices[0].grossPrice.toFixed(2)).replace('.', ',') +
                        ' zł'}
                    </span>
                    <span>
                      {' '}
                      {String(
                        cartItem.Product.Prices[
                          cartItem.Product.Prices.length - 1
                        ].grossPrice.toFixed(2)
                      ).replace('.', ',') + ' zł'}
                    </span>
                  </div>
                ) : (
                  <>
                    {String(
                      (cartItem.Product.Prices[0].grossPrice * cartItem.quantity).toFixed(2)
                    ).replace('.', ',') + ' zł'}
                  </>
                )}
              </td>
              <td className="fw-bold text-center">{cartItem.quantity}</td>
              <td className="fw-bold text-center">
                {cartItem.Product.promotionName !== null ? (
                  <>
                    <span className="text-decoration-line-through fw-normal">
                      {String(
                        (cartItem.Product.Prices[0].grossPrice * cartItem.quantity).toFixed(2)
                      ).replace('.', ',') + ' zł'}
                    </span>
                    <span>
                      {' '}
                      {String(
                        (
                          cartItem.Product.Prices[cartItem.Product.Prices.length - 1].grossPrice *
                          cartItem.quantity
                        ).toFixed(2)
                      ).replace('.', ',') + ' zł'}
                    </span>
                  </>
                ) : (
                  <>
                    {String(
                      (cartItem.Product.Prices[0].grossPrice * cartItem.quantity).toFixed(2)
                    ).replace('.', ',') + ' zł'}
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="border-bottom border border-primary"></div>
      <div className="row text-center">
        <div className="col-xl-4  pb-3 pr-4 pt-2 fs-5 fw-bold">
          {' '}
          Liczba produktów: {cartData.cartData.numberOfProducts}
        </div>
        <div className="col-xl-4  pb-3 pr-4 pt-2 fs-5 fw-bold">
          {' '}
          Łacznie sztuk: {cartData.cartData.totalQuantityofProducts}
        </div>
        <div className="col-xl-4  pb-3 pr-4 pt-2 fs-5 fw-bold">
          Cena całkowita:{' '}
          {String(cartData.cartData.totalPriceOfProducts.toFixed(2)).replace('.', ',')} zł
        </div>
      </div>
    </>
  );
};

export default ProductTable;
