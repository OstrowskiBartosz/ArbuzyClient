import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogged: null
};

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    sessionChange(state, action) {
      state.isLogged = action.payload;
    }
  }
});

export const { sessionChange } = sessionSlice.actions;

export default sessionSlice.reducer;
