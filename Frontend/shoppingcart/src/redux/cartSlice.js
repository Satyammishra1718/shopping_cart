import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: [],
  reducers: {
    addToCart: (state, action) => {
      const { name, price, image, quantity } = action.payload;
      const existingProductIndex = state.findIndex(item => item.name === name);

      if (existingProductIndex !== -1) {
        state[existingProductIndex].quantity += quantity;
      } else {
        state.push({ name, price, image, quantity });
      }
    },
    removeFromCart: (state, action) => {
      const { name } = action.payload;
      const existingProductIndex = state.findIndex(item => item.name === name);

      if (existingProductIndex !== -1) {
        state.splice(existingProductIndex, 1);
      }
    },
    updateQuantity: (state, action) => {
      const { name, quantity } = action.payload;
      const existingProductIndex = state.findIndex(item => item.name === name);

      if (existingProductIndex !== -1) {
        state[existingProductIndex].quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity } = cartSlice.actions;

export default cartSlice.reducer;
