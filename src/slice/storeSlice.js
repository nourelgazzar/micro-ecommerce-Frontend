import { createSlice } from '@reduxjs/toolkit';
const storeSlice = createSlice({
  name: 'store',
  initialState: {
    isLoading: true,
    cart: {},
    products: {},
    totalPrice: 0,
    orders: {},
  },
  reducers: {
    setLoadingTrue: (state, action) => {
      state.isLoading = true;
    },
    setLoadingFalse: (state, action) => {
      state.isLoading = false;
    },
    setCart: (state, action) => {
      state.cart = action.payload;
    },
    setProducts: (state, action) => {
      state.producats = action.payload;
    },
    setOrders: (state, action) => {
      state.orders = action.payload;
    },
    setTotalPrice: (state, action) => {
      state.totalPrice = state + action.payload;
    },
  },
});

export const { setLoadingTrue, setLoadingFalse, setCart, setProducts, setOrders, setTotalPrice } = storeSlice.actions;

export default storeSlice.reducer;
