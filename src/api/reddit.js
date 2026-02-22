const PROXY_URL = 'https://api.allorigins.win/get?url=';

const fetchFromReddit = async (endpoint) => {
  const redditUrl = `https://www.reddit.com/${endpoint.replace(/^\//, '')}`;
  const finalUrl = `${PROXY_URL}${encodeURIComponent(redditUrl)}`;

  const response = await fetch(finalUrl);
  
  if (!response.ok) {
    throw new Error(`Proxy error: ${response.status}`);
  }

  const wrapper = await response.json();
  
  try {
    return JSON.parse(wrapper.contents);
  } catch (e) {
    throw new Error("Reddit blocked the request. Try again in a few minutes.");
  }
};

export const getSubredditPosts = async (subreddit) => {
  const path = subreddit ? `${subreddit}.json` : 'r/popular.json';
  const json = await fetchFromReddit(path);
  return json.data.children.map((post) => post.data);
};

export const getSearchResults = async (searchTerm) => {
  const json = await fetchFromReddit(`/search.json?q=${encodeURIComponent(searchTerm)}`);
  return json.data.children.map((post) => post.data);
};

export const getSubreddits = async () => {
  const json = await fetchFromReddit('subreddits.json');
  return json.data.children.map((subreddit) => subreddit.data);
};

export const getPostComments = async (permalink) => {
  const cleanPermalink = permalink.endsWith('/') ? permalink.slice(0, -1) : permalink;
  const json = await fetchFromReddit(`${cleanPermalink}.json`);
  return json[1].data.children.map((comment) => comment.data);
};