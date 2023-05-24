import { Link } from 'react-router-dom';
import './TopSoldProduct.css';

const TopSoldProduct = ({ productData }) => {
  if (!productData) {
    return (
      <div className="col-sm-12">
        <div className="shadow bg-white rounded mb-4 ProductNavborder">
          <div className="pt-2 pb-2 d-block">
            <span className="fw-bold fs-2">Ładowanie...</span>
          </div>
          <div className="border-bottom border border-primary mb-3"></div>
          <div className="d-flex justify-content-center pt-5 pb-5">
            <div className="spinner-border" role="status">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="">
        <div className="shadow bg-white rounded mb-4 ProductNavborder">
          <div className="pt-2 mb-1 text-center">
            <div className="crownColor">
              <i class="fas fa-crown fs-2"></i>
            </div>
            <div className="fs-5 pt-1 fw-bold text-center">Najczęściej kupowany</div>
          </div>
          <div className="border-bottom border border-primary"></div>
          <div className="my-2 py-2 mainPageProductBorder specialProductWidth ml-auto mr-auto">
            <div className="row invisibleButtons">
              <div className="col-6">
                <div className="mainPageProductIcon">
                  <Link to={'/product/' + productData.productID}>
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
              <Link className="clear-link pointer" to={'/product/' + productData.productID}>
                <img
                  className="mainPageImage"
                  src={`${process.env.REACT_APP_API}${productData.Attributes[0].value}`}
                  alt="Zdjęcie produktu"
                />
              </Link>
              {productData.promotionDiscount ? (
                <div className="discountBadgeGrou">
                  <div className="discountBadge1"></div>
                  <div className="discountBadge2"></div>
                  <div className="discountBadge3"></div>
                  <div className="discountBadgeText">
                    <span className="discountText fs-5 fw-bold">
                      -{productData.promotionDiscount}%
                    </span>
                  </div>
                </div>
              ) : null}
            </div>

            <div className="pb-2">
              <Link className="clear-link pointer" to={'/product/' + productData.productID}>
                {productData.promotionName ? (
                  <span className="fs-5 crossedText">
                    {productData.Prices[0].grossPrice.toLocaleString('pl-PL', {
                      minimumFractionDigits: 2
                    })}{' '}
                    zł
                  </span>
                ) : (
                  <span className="fw-bold fs-5">
                    {productData.Prices[0].grossPrice.toLocaleString('pl-PL', {
                      minimumFractionDigits: 2
                    })}{' '}
                    zł
                  </span>
                )}

                {productData.promotionName ? (
                  <div>
                    <span className="fw-bold fs-3">
                      {productData.Prices[1].grossPrice.toLocaleString('pl-PL', {
                        minimumFractionDigits: 2
                      })}{' '}
                      zł
                    </span>
                  </div>
                ) : null}
              </Link>
            </div>
            <Link className="clear-link pointer" to={'/product/' + productData.productID}>
              <div className="imageLink pointer">
                <span className="fs-7 pointer px-2 mainPageProductName">
                  {productData.Manufacturer.manufacturerName}{' '}
                  {productData.productName.replace(/ *\([^)]*\) */g, '')}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </div>
    );
  }
};

export default TopSoldProduct;
