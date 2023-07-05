import React from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import newAlert from '../../../features/newAlert';
import { updateCartItems } from '../../../store/storeSlices/cartItemsSlice';
import { putData, deleteData } from '../../../features/sharableMethods/httpRequests';
import './CartItem.css';

const CartItem = ({ cartItem, fetchCartData, blockUI, setError, setBlockUI }) => {
  const dispatch = useDispatch();

  const handleTrashClick = useCallback(
    async (cartItemID) => {
      try {
        setBlockUI(true);
        const request = await deleteData(`cartitem/${cartItemID}`);
        if (request.ok) {
          newAlert('danger', 'Usunięto produkt', 'Produkt został usunięty z koszyka.');
          fetchCartData();
          dispatch(updateCartItems(true));
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setBlockUI(false);
      }
    },
    [dispatch, fetchCartData, setBlockUI, setError]
  );

  const handleQuantityClick = async (cartItemID, operationSign) => {
    try {
      setBlockUI(true);
      if (cartItem.quantity > 1 || (cartItem.quantity === 1 && operationSign !== '-')) {
        const request = await putData(`cartitem/${cartItemID}/${operationSign}`);
        const response = await request.json();
        if (response.message === 'The quantity has been updated.') {
          newAlert('primary', 'Zmieniono ilość', 'Ilość danego produktu została zwiększona.');
        } else if (response.message === 'Quantity limit.') {
          newAlert('danger', 'Limit produktu.', 'Brak dodatkowych sztuk produktu.');
        }
      } else {
        newAlert('warning', 'Usunięcie produktu.', 'Aby usunąć produkt uzyj przycisku kosz.');
      }
      fetchCartData();
    } catch (err) {
      setError(err.message);
    } finally {
      setBlockUI(false);
    }
  };

  return (
    <div className="row" key={cartItem.cartItemID}>
      <div className="col-12 componentBackgroundColor shadow-sm p-3 bg-white rounded">
        <div className="row">
          <div className="col-xl-2 vertical-center">
            <div className="image-container2">
              <img
                alt="obraz produktu"
                className=" center-Element-vertical feature_image2"
                src={`${process.env.REACT_APP_API}/${cartItem.Product.Attributes[0].value}`}></img>
            </div>
          </div>
          <div className="col-xl-4 align-text-center fs-5 vertical-center smallScreenPadding">
            <div className="text-left fw-bold">
              <Link to={`/product/${cartItem.Product.productID}`}>
                {cartItem.Product.Manufacturer.manufacturerName + ' '}
                {cartItem.Product.productName}
              </Link>
            </div>
          </div>
          <div className="col-xl-2 align-text-center fs-5 fw-bold vertical-center smallScreenPadding">
            <div className="text-left">
              {cartItem.Product.promotionName === null ? (
                <span>
                  {String(cartItem.Product.Prices[0].grossPrice.toFixed(2)).replace('.', ',')}
                  {' zł '}
                </span>
              ) : (
                <div>
                  <span className="fw-normal fs-6 text-decoration-line-through">
                    {String(cartItem.Product.Prices[0].grossPrice.toFixed(2)).replace('.', ',')}
                    {' zł'}
                  </span>
                  <span className="fw-bold fs-5">
                    {' '}
                    {String(
                      cartItem.Product.Prices[
                        cartItem.Product.Prices.length - 1
                      ].grossPrice.toFixed(2)
                    ).replace('.', ',')}
                    {' zł '}
                  </span>
                  <div className="cartItemDiscountBadgeGroup">
                    <div className="discountBadge1"></div>
                    <div className="discountBadge2"></div>
                    <div className="discountBadge3"></div>
                    <div className="discountBadgeText">
                      <span className="discountText fs-5 fw-bold">
                        -{cartItem.Product.promotionDiscount}%
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="placement-bottomAddToCart"></div>
          </div>
          <div className="col-xl-1 align-text-center vertical-center smallScreenPadding">
            <i
              className={'fas fa-minus cursor-pointer ' + (blockUI ? 'disabled' : '')}
              title="Decrease quantity"
              onClick={() => handleQuantityClick(cartItem.cartItemID, '-')}
              disabled={blockUI ? 'disabled' : false}></i>
            <div className="text-left pl-2 pr-2">
              <input
                className="text-center fw-bold"
                size="1"
                value={cartItem.quantity}
                readOnly></input>
            </div>
            <i
              className={'fas fa-plus cursor-pointer ' + (blockUI ? 'disabled' : '')}
              title="Increase quantity"
              onClick={() => handleQuantityClick(cartItem.cartItemID, '+')}
              disabled={blockUI ? 'disabled' : false}></i>
          </div>
          <div className="col-xl-2 align-text-center fs-5 fw-bold vertical-center smallScreenPadding">
            <div className="text-left">
              {cartItem.Product.promotionName === null ? null : (
                <span className="fw-normal fs-6 text-decoration-line-through">
                  {String(
                    (cartItem.Product.Prices[0].grossPrice * cartItem.quantity).toFixed(2)
                  ).replace('.', ',')}
                  {' zł '}
                </span>
              )}
              {cartItem.Product.promotionName === null
                ? String(
                    (cartItem.Product.Prices[0].grossPrice * cartItem.quantity).toFixed(2)
                  ).replace('.', ',')
                : String(
                    (
                      cartItem.Product.Prices[cartItem.Product.Prices.length - 1].grossPrice *
                      cartItem.quantity
                    ).toFixed(2)
                  ).replace('.', ',')}{' '}
              zł
            </div>
            <div className="placement-bottomAddToCart"></div>
          </div>
          <div className="col-xl-1 align-text-center vertical-center">
            <span>
              <i
                className="fas fa-trash-alt cursor-pointer"
                title="Delete product from cart"
                onClick={() => handleTrashClick(cartItem.cartItemID, cartItem.Product.productID)}
                disabled={blockUI ? false : 'disabled'}></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
