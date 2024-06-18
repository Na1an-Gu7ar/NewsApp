import { configureStore } from '@reduxjs/toolkit';
import newsReducer from './newsSlice';
import progressReducer from './progressSlice';
import categoryReducer from './categorySlice';
import pagination from './pagination';

export const store = configureStore({
    reducer: {
        news: newsReducer,
        progress: progressReducer,
        category: categoryReducer,
        page: pagination
    },
});
