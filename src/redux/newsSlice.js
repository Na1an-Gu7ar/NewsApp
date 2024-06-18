import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ country, category, page, pageSize, query }) => {
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=81d1e57e18774ed5a9147e2f0a517d83&page=${page}&pageSize=${pageSize}`;
    if (category) url += `&category=${category}`;
    if (query) url += `&q=${query}`;

    const response = await fetch(url);
    const data = await response.json();
    return data;
  }
);

const newsSlice = createSlice({
  name: 'news',
  initialState: {
    articles: [],
    totalResults: 0,
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload.articles;
        state.totalResults = action.payload.totalResults;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
