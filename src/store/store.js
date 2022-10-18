import { configureStore } from '@reduxjs/toolkit';

import sessionReducer from './storeSlices/sessionSlice';
import cartItemsReducer from './storeSlices/cartItemsSlice';
import messageAlertsSlice from './storeSlices/messageAlertsSlice';

export default configureStore({
  reducer: {
    session: sessionReducer,
    cartItems: cartItemsReducer,
    alertMessage: messageAlertsSlice
  }
});
