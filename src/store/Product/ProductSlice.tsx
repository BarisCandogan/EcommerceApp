import {createSlice} from '@reduxjs/toolkit';

interface ProductState {
  categories: [];
  id: number;
  categoryPress: boolean;
  homePress: boolean;
  products: [];
  product: [];
}

const initialState: ProductState = {
  categories: [],
  id: 0,
  categoryPress: false,
  homePress: false,
  products: [],
  product: [],
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getCategories: (state, action) => {
      state.categories = action.payload;
    },
    getProduct: (state, action) => {
      state.products = action.payload;
    },
    getCategoryId: (state, action) => {
      state.id = action.payload;
    },
    categoryPress: (state, action) => {
      state.categoryPress = action.payload;
    },
    homePressed: (state, action) => {
      state.homePress = action.payload;
    },
    addProduct: (state, action) => {
      state.product = action.payload;
    },
    deleteProduct: (state, action) => {
      state.product.splice(
        state.product.findIndex(item => item.id === action.payload),
        1,
      );
    },
    clearProduct: state => {
      state.product = [];
    },
  },
});

export const {
  getCategories,
  getCategoryId,
  clearProduct,
  categoryPress,
  homePressed,
  addProduct,
  getProduct,
  deleteProduct,
} = productSlice.actions;

export default productSlice.reducer;
