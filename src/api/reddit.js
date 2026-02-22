const isProduction = window.location.hostname !== 'localhost';

export const API_ROOT = isProduction 
  ? 'https://api.allorigins.win/get?url=' 
  : 'https://proxy.cors.sh/https://www.reddit.com/';

const fetchFromReddit = async (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  
  if (isProduction) {
 
    const targetUrl = encodeURIComponent(`https://www.reddit.com/${cleanEndpoint}`);
    const response = await fetch(`${API_ROOT}${targetUrl}`);
    
    if (!response.ok) throw new Error('Proxy error');
    
    const json = await response.json();
    return JSON.parse(json.contents);
  } else {
    const response = await fetch(`${API_ROOT}${cleanEndpoint}`, {
      headers: { 'x-cors-gratis': 'true' }
    });
    if (!response.ok) throw new Error('Local proxy error');
    return await response.json();
  }
};

export const getSubredditPosts = async (subreddit) => {
  const path = subreddit || 'r/popular';
  const data = await fetchFromReddit(`${path}.json`);
  return data.data.children.map((post) => post.data);
};

export const getSearchResults = async (searchTerm) => {
  const json = await fetchFromReddit(`/search.json?q=${encodeURIComponent(searchTerm)}`);
  return json.data.children.map((post) => post.data);
};

export const getSubreddits = async () => {
  const data = await fetchFromReddit('subreddits.json');
  return data.data.children.map((subreddit) => subreddit.data);
};

export const getPostComments = async (permalink) => {
  const cleanPermalink = permalink.endsWith('/') ? permalink.slice(0, -1) : permalink;
  const json = await fetchFromReddit(`${cleanPermalink}.json`);
  return json[1].data.children.map((comment) => comment.data);
};