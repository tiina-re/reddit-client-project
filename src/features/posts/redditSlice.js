import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSubredditPosts, getSearchResults, getPostComments } from '../../api/reddit';

// This is the "Action" that fetches the data
export const fetchPosts = createAsyncThunk(
  'reddit/fetchPosts',
  async ({ subreddit, searchTerm }) => {
    if (searchTerm) {
      return await getSearchResults(searchTerm);
    }
    
    return await getSubredditPosts(subreddit);
  }
);

export const fetchComments = createAsyncThunk(
  'reddit/fetchComments',
  async ({ index, permalink }) => {
    //Get the already-mapped data from API helper
    const commentsData = await getPostComments(permalink);
    
    // Just format the fields you want for UI
    const formattedComments = commentsData.map((comment) => ({
      id: comment.id,
      author: comment.author,
      body: comment.body,
      ups: comment.ups,
      created_utc: comment.created_utc,
      replies: comment.replies ? comment.replies.data?.children : []
    }));

    return { index, comments: formattedComments };
  }
);

const redditSlice = createSlice({
  name: 'reddit',
  initialState: {
    posts: [],
    isLoading: false,
    error: false,
    searchTerm: '',
    selectedSubreddit: '/r/popular',  //Default starting point
  },

  reducers: {
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    //For the sidebar to update the feed
    setSelectedSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
      state.searchTerm = '';  //To clear search when switching subreddits
    },
    updatePostVote: (state, action) => {
      const { index, direction } = action.payload;

      state.posts[index].ups += direction;
    }
  }, 
  extraReducers: (builder) => {
    builder
    //fetchPosts cases
      .addCase(fetchPosts.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.posts = action.payload.map(post => ({
          ...post,
          showingComments: false,
          comments: [],
          loadingComments: false,
          errorComments: false,
        }));
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.isLoading = false;
        state.error = true;
      })
      //fetchComments cases
      .addCase(fetchComments.pending, (state, action) => {
        const { index } = action.meta.arg; 
        /*action.meta.arg: Redux Toolkit feature that gives access
        to the arguments passed to the Thunk (the index) 
        even before the API responds. This allows to show
        a "Loading..." message for just that one post.*/
        state.posts[index].loadingComments = true;
        state.posts[index].showingComments = !state.posts[index].showingComments; //as soon as the user clicks, the comment section opens.
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        const { index, comments } = action.payload;
        state.posts[index].loadingComments = false;
        state.posts[index].comments = comments;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        const { index } = action.meta.arg;
        state.posts[index].loadingComments = false;
        state.posts[index].errorComments = true;
      });
  },
});

export const { setSearchTerm, setSelectedSubreddit, updatePostVote } = redditSlice.actions;
export const selectSearchTerm = (state) => state.reddit.searchTerm;
export default redditSlice.reducer;