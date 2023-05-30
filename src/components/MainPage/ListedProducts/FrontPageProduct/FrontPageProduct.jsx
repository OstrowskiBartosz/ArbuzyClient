import { Link } from 'react-router-dom';
import './FrontPageProduct.css';

const FrontPageProduct = ({ product }) => {
  return (
    <div className={`d-inline productCard d-flex`}>
      <div className="m-2 p-2 mainPageProductBorder">
        <div className="row invisibleButtons">
          <div className="col-6">
            <div className="mainPageProductIcon">
              <Link to={'/product/' + product.productID}>
                <div>
                  <i className="fas fa-arrow-up-right-from-square mainPageProductIcon fs-5 float-left"></i>
                </div>
              </Link>
            </div>
          </div>
          <div className="col-6">
            <div className="">
              <i className="fas fa-cart-shopping mainPageProductIcon fs-5 float-right"></i>
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
                <span className="discountText fs-5 fw-bold">-{product.promotionDiscount}%</span>
              </div>
            </div>
          ) : null}
        </div>

        <div className="pb-2">
          <Link className="clear-link pointer" to={'/product/' + product.productID}>
            {product.promotionName ? (
              <span className="fs-5 crossedText">
                {product.Prices[0].grossPrice.toLocaleString('pl-PL', {
                  minimumFractionDigits: 2
                })}{' '}
                zł
              </span>
            ) : (
              <span className="fw-bold fs-5 d-inline-block"></span>
            )}

            {product.promotionName ? (
              <div>
                <span className="fw-bold fs-3">
                  {product.Prices[1].grossPrice.toLocaleString('pl-PL', {
                    minimumFractionDigits: 2
                  })}{' '}
                  zł
                </span>
              </div>
            ) : (
              <div>
                <span className="fw-bold fs-3">
                  {product.Prices[0].grossPrice.toLocaleString('pl-PL', {
                    minimumFractionDigits: 2
                  })}{' '}
                  zł
                </span>
              </div>
            )}
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
  );
};

export default FrontPageProduct;
