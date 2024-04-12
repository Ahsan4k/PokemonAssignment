import {configureStore, combineReducers} from '@reduxjs/toolkit';
import CartReducer from './cartSlice';

const reducer = combineReducers({
  cart: CartReducer,
});

export const store = configureStore({
  reducer: reducer,
});
