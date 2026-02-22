const isProduction = window.location.hostname !== 'localhost';

export const API_ROOT = isProduction 
  ? '/reddit-api' 
  : 'https://proxy.cors.sh/https://www.reddit.com';

const fetchFromReddit = async (endpoint) => {
  const url = `${API_ROOT}${endpoint}`;

  const options = {
    headers: isProduction ? {} : { 'x-cors-gratis': 'true' }
  };

  const response = await fetch(url, options);
  
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.status}`);
  }
  return await response.json();
};

export const getSubredditPosts = async (subreddit) => {
  const path = subreddit ? `/${subreddit}` : '/r/popular';
  const json = await fetchFromReddit(`${path}.json`);
  return json.data.children.map((post) => post.data);
};

export const getSearchResults = async (searchTerm) => {
  const json = await fetchFromReddit(`/search.json?q=${encodeURIComponent(searchTerm)}`);
  return json.data.children.map((post) => post.data);
};

export const getSubreddits = async () => {
  const json = await fetchFromReddit('/subreddits.json');
  return json.data.children.map((subreddit) => subreddit.data);
};

export const getPostComments = async (permalink) => {
  const cleanPermalink = permalink.endsWith('/') ? permalink.slice(0, -1) : permalink;
  const json = await fetchFromReddit(`${cleanPermalink}.json`);
  return json[1].data.children.map((comment) => comment.data);
};