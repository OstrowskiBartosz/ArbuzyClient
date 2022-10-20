import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mostBoughtCategoryProducts: [],
  mostBoughtProducts: [],
  youMayLikeProducts: [],
  lastUpdate: new Date().getTime()
};

const productSlice = createSlice({
  name: 'productsSlice',
  initialState,
  reducers: {
    updateProducts(state, action) {
      state.mostBoughtCategoryProducts = action.payload.mostBoughtCategoryProducts;
      state.mostBoughtProducts = action.payload.mostBoughtProducts;
      state.youMayLikeProducts = action.payload.youMayLikeProducts;
      state.lastUpdate = action.payload.lastUpdate;
    }
  }
});

export const { updateProducts } = productSlice.actions;

export default productSlice.reducer;
