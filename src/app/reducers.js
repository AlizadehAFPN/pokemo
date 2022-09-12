import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getPokemons = createAsyncThunk(
  'pokemons/getPokemons',
  async url => {
    const response = await axios.get(url, {
      params: {
        limit:1154,
      }}
        );

    return response.data;
  },
);
export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: {
    data: {
      next:'',
      previous:'',
      pokemons:[],
    },
    loading: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(getPokemons.pending, (state, action) => {
      if (state.loading === 'idle') {
        state.loading = 'pending';
      }
    });
    builder.addCase(getPokemons.fulfilled, (state, action) => {
      if (state.loading === 'pending') {
        state.data = {
          ...state.data,
          next: action.payload.next,
          previous: action.payload.previous,
          pokemons: action.payload.results,
        };
        state.loading = 'idle';
      }
    });
    builder.addCase(getPokemons.rejected, (state, action) => {
      if (state.loading === 'pending') {
        state.loading = 'idle';
        state.error = 'Error occured';
      }
    });
  },
});
export default pokemonsSlice.reducer;
