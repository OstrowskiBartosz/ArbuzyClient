import React from 'react';
import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import newAlert from '../../../features/newAlert';
import { updateCartItems } from '../../../store/storeSlices/cartItemsSlice';

const CartItem = ({ cartItem, fetchCartData, blockUI, setError, setBlockUI }) => {
  const dispatch = useDispatch();

  const handleTrashClick = useCallback(
    async (cartItemID) => {
      try {
        setBlockUI(true);
        const url = `${process.env.REACT_APP_API}/cartitem/${cartItemID}`;
        const response = await fetch(url, { method: 'delete', credentials: 'include' });
        if (response.ok) {
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
        const url = `${process.env.REACT_APP_API}/cartitem/${cartItemID}/${operationSign}`;
        const response = await fetch(url, { method: 'put', credentials: 'include' });
        const json = await response.json();
        if (json.message === 'The quantity has been updated.') {
          newAlert('primary', 'Zmieniono ilość', 'Ilość danego produktu została zwiększona.');
        } else if (json.message === 'Quantity limit.') {
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
              {String(cartItem.Product.Prices[0].grossPrice.toFixed(2)).replace('.', ',')} zł
            </div>
            <div className="placement-bottomAddToCart"></div>
          </div>
          <div className="col-xl-1 align-text-center vertical-center smallScreenPadding">
            <i
              className={'fas fa-minus cursor-pointer ' + (blockUI ? 'disabled' : '')}
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
              onClick={() => handleQuantityClick(cartItem.cartItemID, '+')}
              disabled={blockUI ? 'disabled' : false}></i>
          </div>
          <div className="col-xl-2 align-text-center fs-5 fw-bold vertical-center smallScreenPadding">
            <div className="text-left">
              {String(
                (cartItem.Product.Prices[0].grossPrice * cartItem.quantity).toFixed(2)
              ).replace('.', ',')}{' '}
              zł
            </div>
            <div className="placement-bottomAddToCart"></div>
          </div>
          <div className="col-xl-1 align-text-center vertical-center">
            <span>
              <i
                className="fas fa-trash-alt cursor-pointer"
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
