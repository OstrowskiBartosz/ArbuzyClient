import React from 'react';
import { HashLink } from 'react-router-hash-link';
import './ProductNavbar.css';

const ProductNavbar = ({ productID, scrollWithOffset }) => {
  return (
    <div className="stickyProductNav navbar navbar-expand-lg navbar-light bg-light ProductNavborder">
      <div className="d-flex justify-content-between">
        <ul className="navbar-nav mr-auto">
          <li className={'nav-item pr-3'}>
            <HashLink smooth to={`/product/${productID}#productSummary`} scroll={(el) => scrollWithOffset(el)} className="text-decoration-none">
              <span className="stickyProductNavLink">Podsumowanie produktu</span>
            </HashLink>
          </li>
          <div className="productNavigationDivider"></div>
          <li className={'nav-item pr-3 productNavigationPadding'}>
            <HashLink smooth to={`/product/${productID}#productDescription`} scroll={(el) => scrollWithOffset(el)} className="text-decoration-none">
              <span className="stickyProductNavLink">Opis produktu</span>
            </HashLink>
          </li>
          <div className="productNavigationDivider"></div>
          <li className={'nav-item pr-3 productNavigationPadding'}>
            <HashLink smooth to={`/product/${productID}#productSpecification`} scroll={(el) => scrollWithOffset(el)} className="text-decoration-none">
              <span className="stickyProductNavLink">Specyfikacja produktu</span>
            </HashLink>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProductNavbar;
