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
    cartRemove: (state, action) => {
      state.data = state.data.filter(item => item.name != action.payload.name);
    },
    cartIncrease: (state, action) => {
      const pokemonToIncrease = action.payload.pokemon;
      const existingPokemonIndex = state.data.findIndex(
        item => item.name === pokemonToIncrease,
      );
      if (existingPokemonIndex !== -1) {
        state.data[existingPokemonIndex].quantity += 1;
      }
    },
    cartDecrease: (state, action) => {
      const pokemonToDecrease = action.payload.pokemon;
      const existingPokemonIndex = state.data.findIndex(
        item => item.name === pokemonToDecrease,
      );
      if (existingPokemonIndex !== -1) {
        state.data[existingPokemonIndex].quantity -= 1;
      }
    },
  },
});

export const {cartAdd, cartRemove, cartIncrease, cartDecrease} =
  CartSlice.actions;

export default CartSlice.reducer;
