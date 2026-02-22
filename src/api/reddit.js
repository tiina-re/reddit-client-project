export const API_ROOT = 'https://www.reddit.com';

/* Utility to fetch data using a CORS proxy.
 */
const fetchFromReddit = async (endpoint) => {
  const response = await fetch(`${API_ROOT}${endpoint}`);
  
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status}`);
  }
  return await response.json();
};

export const getSubredditPosts = async (subreddit) => {
  const path = subreddit || '/r/popular';
  const json = await fetchFromReddit(`${path}.json`);
  return json.data.children.map((post) => post.data);
};

export const getSearchResults = async (searchTerm) => {
  const json = await fetchFromReddit(`/search.json?q=${searchTerm}`);
  return json.data.children.map((post) => post.data);
};

export const getSubreddits = async () => {
  const json = await fetchFromReddit('/subreddits.json');
  return json.data.children.map((subreddit) => subreddit.data);
};

/**
 * Fetches comments for a specific post.
 * We use the permalink to ensure we get the full thread.
 */
export const getPostComments = async (permalink) => {
  // Ensure the permalink is clean and ends in .json
  const cleanPermalink = permalink.endsWith('/') ? permalink.slice(0, -1) : permalink;
  const json = await fetchFromReddit(`${cleanPermalink}.json`);

  /* Reddit returns an array for comment requests:
    json[0] contains the post metadata
    json[1] contains the actual comment tree
  */
  return json[1].data.children.map((comment) => comment.data);
};