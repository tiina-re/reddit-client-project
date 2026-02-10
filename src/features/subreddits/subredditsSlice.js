import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getSubreddits } from '../../api/reddit';

export const fetchSubreddits = createAsyncThunk (
    'subreddits/fetchSubreddits',
    async () => {
        return await getSubreddits();
    }
);

const subredditsSlice = createSlice({
    name: 'subreddits',
    initialState: { // Fixed: Capital 'S'
        subreddits: [],
        isLoading: false,
        error: false,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(fetchSubreddits.pending, (state) => {
            state.isLoading = true; // Changed to true since we are waiting
            state.error = false;
        })
        .addCase(fetchSubreddits.fulfilled, (state, action) => {
            state.isLoading = false;
            state.subreddits = action.payload; // Fixed: Use 'action.payload'
        })
        .addCase(fetchSubreddits.rejected, (state) => {
            state.isLoading = false;
            state.error = true;
        });
    },
});

export const selectSubreddits = (state) => state.subreddits.subreddits;
export default subredditsSlice.reducer;