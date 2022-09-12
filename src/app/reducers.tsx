import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../api';
import { baseURL } from '../constant';

export const getPokemons = createAsyncThunk(
  'pokemons/getPokemons',
  async (limit:number) => {
    const response = await api.get(`${baseURL}?limit=${limit}`);
    return response.data;
  },
);

export const pokemonsSlice = createSlice({
  name: 'pokemons',
  initialState: {
    data: {
      next: '',
      previous: '',
      pokemons: [],
    },
    loading: 'idle',
    error: '',
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
