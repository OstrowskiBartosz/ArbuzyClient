import { Link } from 'react-router-dom';
import './ListedProducts.css';

const ListedProducts = ({ products, productsTitle, isLoadingData, error }) => {
  return (
    <div className="shadow bg-white rounded mb-4">
      <div className="pt-3 mb-3 text-center position-relative">
        <div className="categoryHeader text-center">{productsTitle}</div>
        <div className="productPageBar">
          <button type="button" className="btn btn-outline-secondary float-right ml-1">
            <i className="fas fa-arrow-right"></i>
          </button>
          <button type="button" className="btn btn-outline-secondary float-right ml-1 ">
            strona
          </button>
          <button type="button" className="btn btn-outline-secondary float-right">
            <i className="fas fa-arrow-left"></i>
          </button>
        </div>
      </div>

      <div className="border-bottom border border-primary"></div>
      {isLoadingData ? (
        <div className="d-flex justify-content-center pt-5 pb-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row pb-4">
          {products.map((product, index) => (
            <div key={index} className="col-sm-2">
              <div className="m-2 p-2 mainPageProductBorder">
                <div className="row invisibleButtons">
                  <div className="col-6">
                    <div className="mainPageProductIcon">
                      <Link to={'/product/' + product.productID}>
                        <div>
                          <i className="fas fa-arrow-up-right-from-square mainPageProductIcon float-left"></i>
                        </div>
                      </Link>
                    </div>
                  </div>
                  <div className="col-6">
                    <div className="">
                      <i className="fas fa-cart-shopping mainPageProductIcon float-right"></i>
                    </div>
                  </div>
                </div>

                <div className="mainPageImageContainer position-relative">
                  <Link className="clear-link pointer" to={'/product/' + product.productID}>
                    <img
                      className="mainPageImage"
                      src={`${process.env.REACT_APP_API}${product.Attributes[0].value}`}
                      alt="Zdjęcie produktu"
                    />
                  </Link>
                  {product.promotionDiscount ? (
                    <div className="discountBadgeGroup">
                      <div className="discountBadge1"></div>
                      <div className="discountBadge2"></div>
                      <div className="discountBadge3"></div>
                      <div className="discountBadgeText">
                        <span className="discountText fs-5 fw-bold">
                          -{product.promotionDiscount}%
                        </span>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="pb-2">
                  <Link className="clear-link pointer" to={'/product/' + product.productID}>
                    <span className="fw-bold fs-5 crossedText">
                      {product.Prices[0].grossPrice.toLocaleString('pl-PL', {
                        minimumFractionDigits: 2
                      })}{' '}
                      zł
                    </span>
                    {product.promotionName ? (
                      <div>
                        <span className="fw-bold fs-3">
                          {product.Prices[1].grossPrice.toLocaleString('pl-PL', {
                            minimumFractionDigits: 2
                          })}{' '}
                          zł
                        </span>
                      </div>
                    ) : null}
                  </Link>
                </div>
                <Link className="clear-link pointer" to={'/product/' + product.productID}>
                  <div className="imageLink pointer">
                    <span className="fs-7 pointer px-2 mainPageProductName">
                      {product.Manufacturer.manufacturerName}{' '}
                      {product.productName.replace(/ *\([^)]*\) */g, '')}
                    </span>
                  </div>
                </Link>
              </div>
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
  );
};

export default ListedProducts;
