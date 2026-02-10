export const API_ROOT = 'https://www.reddit.com';

export const getSubredditPosts = async (subreddit) => {
  const path = subreddit || '/r/popular'; 
  const response = await fetch(`https://corsproxy.io/?${API_ROOT}${path}.json`);
  const json = await response.json();

  return json.data.children.map((post) => post.data);
};

export const getSearchResults = async (searchTerm) => {
  const response = await fetch(
    `https://corsproxy.io/?${API_ROOT}/search.json?q=${searchTerm}`
  );
  const json = await response.json();

  return json.data.children.map((post) => post.data);
};

export const getSubreddits = async () => {
  const response = await fetch(`https://corsproxy.io/?${API_ROOT}/subreddits.json`);
  const json = await response.json();

  return json.data.children.map((subreddit) => subreddit.data);
};

// ADD THIS: New function for comments
export const getPostComments = async (permalink) => {
  const response = await fetch(`https://corsproxy.io/?${API_ROOT}${permalink}.json`);
  const json = await response.json();

  // Reddit returns comments in the second object of the response array
  return json[1].data.children.map((subreddit) => subreddit.data);
};