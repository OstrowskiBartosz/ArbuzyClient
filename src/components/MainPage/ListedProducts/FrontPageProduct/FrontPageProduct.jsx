import { Link } from 'react-router-dom';
import './FrontPageProduct.css';

const FrontPageProduct = ({ product }) => {
  return (
    <div className={`d-inline productCard d-flex`}>
      <div className="mainPageProductBorder">
        <Link className="clear-link pointer" to={'/product/' + product.productID}>
          <div className="mainPageImageContainer">
            <div className="position-relative imagePosition">
              <img className="mainPageImage" src={`${process.env.REACT_APP_API}${product.Attributes[0].value}`} alt="Zdjęcie produktu" />
              {product.promotionDiscount ? (
                <div className="discountSmallProductGroup">
                  <div className="discountBadge1"></div>
                  <div className="discountBadge2"></div>
                  <div className="discountBadge3"></div>
                  <div className="discountBadgeText">
                    <span className="discountText fs-5 fw-bold">-{product.promotionDiscount}%</span>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <div className="pb-0">
            {product.promotionName ? (
              <span className="fs-5 crossedText">
                {product.Prices[0]?.grossPrice.toLocaleString('pl-PL', {
                  minimumFractionDigits: 2
                })}{' '}
                zł
              </span>
            ) : (
              <span className="fs-5 whiteText">_</span>
            )}

            {product.promotionName ? (
              <div>
                <span className="fw-bold fs-5">
                  {product.Prices[1]?.grossPrice.toLocaleString('pl-PL', {
                    minimumFractionDigits: 2
                  })}{' '}
                  zł
                </span>
              </div>
            ) : (
              <div>
                <span className="fw-bold fs-5">
                  {product.Prices[0]?.grossPrice.toLocaleString('pl-PL', {
                    minimumFractionDigits: 2
                  })}{' '}
                  zł
                </span>
              </div>
            )}
          </div>

          <div className="imageLink px-3">
            <span
              className="fs-7 pointer px-2 mainPageProductName"
              data-toggle="tooltip"
              title={`${product.Manufacturer.manufacturerName} ${product.productName.replace(/ *\([^)]*\) */g, '')}`}>
              {product.Manufacturer.manufacturerName} {product.productName.replace(/ *\([^)]*\) */g, '')}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default FrontPageProduct;
