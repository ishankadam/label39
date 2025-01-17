import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  openShopMenu: false,
  totalItems: 0,
  openCartDrawer: false,
  giftCardOpen: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.productId === action.payload.productId
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        if (Array.isArray(action.payload)) {
          state.items = [...action.payload];
        } else {
          state.items.push(action.payload);
        }
      }
      state.totalItems = state.items.length;
      state.openCartDrawer = true;
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(
        (item) => item.productId !== action.payload
      );
      state.totalItems = state.items.length;
    },
    updateQuantity: (state, action) => {
      const item = state.items.find(
        (item) => item.productId === action.payload.productId
      );
      if (item) {
        if (action.payload.operation === "increase") {
          item.quantity += 1;
        } else if (action.payload.operation === "decrease") {
          if (item.quantity > 1) {
            item.quantity -= 1;
          } else {
            // Remove item if quantity would go below 1
            state.items = state.items.filter(
              (i) => i.productId !== action.payload.productId
            );
            state.totalItems = state.items.length;
          }
        } else if (typeof action.payload.quantity === "number") {
          // Handle direct quantity updates
          item.quantity = Math.max(1, action.payload.quantity);
        }
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.totalItems = 0;
    },
    openDialog: (state) => {
      state.openShopMenu = true;
    },
    closeDialog: (state) => {
      state.openShopMenu = false;
    },
    openCartDrawer: (state) => {
      state.openCartDrawer = true;
    },
    closeCartDrawer: (state) => {
      state.openCartDrawer = false;
    },
    openGiftCard: (state) => {
      state.giftCardOpen = true;
    },
    closeGiftCard: (state) => {
      state.giftCardOpen = false;
    },
  },
});

export const {
  addToCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  openDialog,
  closeDialog,
  openCartDrawer,
  closeCartDrawer,
  openGiftCard,
  closeGiftCard,
} = cartSlice.actions;

export default cartSlice.reducer;
