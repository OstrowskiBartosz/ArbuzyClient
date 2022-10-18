import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mostBoughtCategoryProducts: [],
  mostBoughtProducts: [],
  youMayLikeThisProducts: [],
  lastUpdate: new Date().getTime()
};

const productsSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {
    updateProducts(state, action) {
      state.mostBoughtCategoryProducts = action.payload.mostBoughtCategoryProducts;
      state.mostBoughtProducts = action.payload.mostBoughtProducts;
      state.youMayLikeThisProducts = action.payload.youMayLikeThisProducts;
      state.lastUpdate = action.payload.lastUpdate;
    }
  }
});

export const { updateProducts } = productsSlice.actions;

export default productsSlice.reducer;
