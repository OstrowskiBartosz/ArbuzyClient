import { configureStore } from '@reduxjs/toolkit';

import sessionReducer from './storeSlices/sessionSlice';
import cartItemsReducer from './storeSlices/cartItemsSlice';
import messageAlertsReducer from './storeSlices/messageAlertsSlice';
import productReducer from './storeSlices/productsSlice';

export default configureStore({
  reducer: {
    session: sessionReducer,
    cartItems: cartItemsReducer,
    alertMessage: messageAlertsReducer,
    products: productReducer
  }
});
