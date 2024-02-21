import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import api from './api';  

// Async thunk for Leaderboard
export const fetchLeaderboard = createAsyncThunk('leaderboard/fetch', async () => {
  const response = await api.get('/api/leaderboard/');
  return response.data;
});

export const leaderboardSlice = createSlice({
  name: 'leaderboard',
  initialState: {
    entities: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaderboard.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaderboard.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = false;
      })
      .addCase(fetchLeaderboard.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      });
  },
});

export default leaderboardSlice.reducer;