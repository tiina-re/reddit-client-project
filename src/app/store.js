import { configureStore } from '@reduxjs/toolkit';
import redditReducer from '../features/posts/redditSlice';
import subredditsReducer from '../features/subreddits/subredditsSlice';

export const store = configureStore({
  reducer: {
    reddit: redditReducer,
    subreddits: subredditsReducer,
  },
});