import {createSlice} from '@reduxjs/toolkit';

const CartSlice = createSlice({
  name: 'cart',
  initialState: {data: []},
  reducers: {
    cartAdd: (state, action) => {
      const pokemonToAdd = action.payload.pokemon;
      const existingPokemonIndex = state.data.findIndex(
        item => item.name === pokemonToAdd.name,
      );
      if (existingPokemonIndex !== -1) {
        state.data[existingPokemonIndex].quantity += 1;
      } else {
        state.data.push({...pokemonToAdd, quantity: 1});
      }
    },
  },
});

export const {cartAdd} = CartSlice.actions;

export default CartSlice.reducer;