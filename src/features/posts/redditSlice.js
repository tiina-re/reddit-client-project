import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSubredditPosts, getSearchResults, getPostComments } from '../../api/reddit';

// Fetches posts based on subreddit or search term
export const fetchPosts = createAsyncThunk(
  'reddit/fetchPosts',
  async ({ subreddit, searchTerm }) => {
    if (searchTerm) {
      return await getSearchResults(searchTerm);
    }
    return await getSubredditPosts(subreddit);
  }
);

// Fetches comments for a specific post
export const fetchComments = createAsyncThunk(
  'reddit/fetchComments',
  async (permalink) => {
    return await getPostComments(permalink);
  }
);

const redditSlice = createSlice({
  name: 'reddit',
  initialState: {
    posts: [],
    isLoading: false,
    error: false,
    searchTerm: '',
    selectedSubreddit: '/r/popular',
    comments: [],
    loadingComments: false,
    errorComments: false,
  },
  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    setSelectedSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
      state.searchTerm = '';
    },
    updatePostVote: (state, action) => {
      const { index, direction } = action.payload;
      if (state.posts[index]) {
        state.posts[index].ups += direction;
      }
    }
  }, 
  extraReducers: (builder) => {
    builder

      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      
      .addCase(fetchComments.pending, (state) => {
        state.loadingComments = true;
        state.errorComments = false;
        state.comments = []; 
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loadingComments = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state) => {
        state.loadingComments = false;
        state.errorComments = true;
      });
  },
});


export const { 
  setSearchTerm, 
  setSelectedSubreddit, 
  updatePostVote 
} = redditSlice.actions;

export const selectSearchTerm = (state) => state.reddit.searchTerm;
export const selectSelectedSubreddit = (state) => state.reddit.selectedSubreddit;
export const selectPosts = (state) => state.reddit.posts;

export default redditSlice.reducer;