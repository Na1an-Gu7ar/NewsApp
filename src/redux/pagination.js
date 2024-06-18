import { createSlice } from '@reduxjs/toolkit';

const pagination = createSlice({
  name: 'pagination',
  initialState: {
    page: 1,
    progress: 0,
  },
  reducers: {
    incrementPage: (state) => {
      state.page += 1;
    },
    decrementPage: (state) => {
      state.page -= 1;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
    resetProgress: (state) => {
      state.progress = 0;
    },
  },
});

export const { incrementPage, decrementPage, setProgress, resetProgress } = pagination.actions;

export default pagination.reducer;
