import { useState } from 'react';
import './ListedProducts.css';
import FrontPageProduct from './FrontPageProduct/FrontPageProduct';

const ListedProducts = ({ listedID, products, isLoadingData, topSold, error }) => {
  const getScrollValue = (direction) => {
    const element = document.getElementById(listedID);
    const maxScrollWidth = element.scrollWidth - element.clientWidth;

    direction === 'right' ? (element.scrollLeft += 270) : (element.scrollLeft -= 270);
    setScrollArrows({
      arrowLeft: direction === 'left' && element.scrollLeft - 270 <= 0 ? false : true,
      arrowRight: direction === 'right' && element.scrollLeft + 270 >= maxScrollWidth ? false : true
    });
  };

  const [scrollArrows, setScrollArrows] = useState({ arrowLeft: false, arrowRight: true });
  return (
    <div className="shadow bg-white rounded mb-4 overflow-auto">
      {isLoadingData ? (
        <div className="d-flex justify-content-center pt-5 pb-5">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : null}
      {!isLoadingData ? (
        <>
          <div className="row position-relative mx-0">
            {scrollArrows.arrowLeft ? (
              <div
                className="scrollArrowLeft shadow circle d-flex"
                onClick={() => getScrollValue('left')}>
                <div className="m-auto">
                  <i className="fa-solid fa-arrow-left" title="Horizontal Scroll Left"></i>
                </div>
              </div>
            ) : null}

            <div className={topSold ? 'inlineScrollTopSold' : 'inlineScroll'} id={listedID}>
              {topSold ? (
                <div className="d-flex flex-row justify-content-start">
                  <div className="frontPageProductTitle">
                    <div className="pt-2 mb-2">
                      <div className="iconBiColor">
                        <i className="fas fa-crown fs-4"></i>
                      </div>
                      <div className="fs-5 pt-1 fw-bold">Najczęściej kupowany</div>
                    </div>
                    <div className="border-bottom border border-primary"></div>
                  </div>

                  <div className="frontPageProductTitle stickyRunnersUp pl-2">
                    <div className="pt-2 mb-2">
                      <div className="iconBiColor">
                        <i className="fa-solid fa-ranking-star fs-4"></i>
                      </div>
                      <div className="fs-5 pt-1 fw-bold">Często kupowane produkty</div>
                    </div>
                    <div className="border border-bottom border-primary boarderWidth"></div>
                  </div>
                </div>
              ) : null}
              {topSold ? (
                <div>
                  <FrontPageProduct product={products[0]} />
                  <div className="d-inline-block pl-2">
                    {products.map((product, index) =>
                      index === 0 ? null : <FrontPageProduct product={product} key={index} />
                    )}
                  </div>
                </div>
              ) : (
                <div>
                  <div className="d-inline-block">
                    {products.map((product, index) => (
                      <FrontPageProduct product={product} key={index} />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {scrollArrows.arrowRight ? (
              <div
                className="scrollArrowRight shadow circle d-flex"
                onClick={() => getScrollValue('right')}>
                <div className="m-auto">
                  <i className="fa-solid fa-arrow-right" title="Horizontal Scroll Right"></i>
                </div>
              </div>
            ) : null}
          </div>
        </>
      ) : null}

      {error && (
        <div className="d-flex justify-content-center pt-5 pb-5">
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default ListedProducts;
