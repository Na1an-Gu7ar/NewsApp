import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchNews = createAsyncThunk(
  'news/fetchNews',
  async ({ country, category, page, numResults, query }) => {
    let url = `https://newsapi.org/v2/top-headlines?country=${country}&apiKey=81d1e57e18774ed5a9147e2f0a517d83&page=${page}&numResults=${numResults}`;

    // Below api key and url is for worldnewsapi 
    // const apiKey = "133c9368-3990-4b4a-a67d-533374c3f399"
    // let url = `https://api.goperigon.com/v1/all?country=${country}&sortBy=date&apiKey=${apiKey}&page=${page}&numResults=${numResults}`

    axios.get(url)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
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
