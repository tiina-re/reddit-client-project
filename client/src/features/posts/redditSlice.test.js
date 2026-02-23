import redditReducer, { setSearchTerm } from './redditSlice';
import { describe, it, expect } from 'vitest';

describe('redditSlice reducer', () => {
  it('should handle initial state', () => {
    expect(redditReducer(undefined, { type: 'unknown' })).toEqual({
      posts: [],
      comments: [],
      error: false,
      errorComments: false,
      isLoading: false,
      loadingComments: false,
      searchTerm: "",
      selectedSubreddit: '/r/popular',
    });
  });

  it('should handle setSearchTerm', () => {
    const actual = redditReducer(undefined, setSearchTerm('finance'));
    expect(actual.searchTerm).toBe('finance');
  });
});