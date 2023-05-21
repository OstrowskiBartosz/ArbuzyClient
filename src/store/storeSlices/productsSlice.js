import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mostBoughtCategoryProducts: [],
  mostBoughtProducts: [],
  youMayLikeProducts: [],
  dailyPromoProduct: {},
  weeklyPromoProduct: {},
  dailyDiscountProducts: [],
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
      state.promoProducts = action.payload.promoProducts;
      state.dailyPromoProduct = action.payload.dailyPromoProduct;
      state.weeklyPromoProduct = action.payload.weeklyPromoProduct;
      state.dailyDiscountProducts = action.payload.dailyDiscountProducts;
      state.lastUpdate = action.payload.lastUpdate;
    }
  }
});

export const { updateProducts } = productSlice.actions;

export default productSlice.reducer;
