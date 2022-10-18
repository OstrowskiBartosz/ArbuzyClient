import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  numberOfProducts: 0,
  updateCartItems: true
};

const cartItemsSlice = createSlice({
  name: 'cartItems',
  initialState,
  reducers: {
    cartItemsChange(state, action) {
      state.numberOfProducts = action.payload.numberOfProducts;
      state.updateCartItems = action.payload.updateCartItems;
    },
    updateCartItems(state, action) {
      state.updateCartItems = action.payload;
    }
  }
});

export const { cartItemsChange, updateCartItems } = cartItemsSlice.actions;

export default cartItemsSlice.reducer;
