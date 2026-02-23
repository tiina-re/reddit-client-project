const PROXY_BASE_URL = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api/reddit' 
  : 'https://reddit-client-project.onrender.com';

const fetchFromReddit = async (endpoint) => {
  // Regex to strip any leading slashes and ANY existing .json occurrences
  const cleanEndpoint = endpoint.replace(/^\//, '').replace(/\.json/g, '');
  
  let urlPath;
  if (cleanEndpoint.includes('?')) {
    const [path, query] = cleanEndpoint.split('?');
    urlPath = `${path}.json?${query}`;
  } else {
    urlPath = `${cleanEndpoint}.json`;
  }

  const finalUrl = `${PROXY_BASE_URL}/${urlPath}`;
  console.log("Fetching from:", finalUrl); 

  const response = await fetch(finalUrl);
  if (!response.ok) {
     const errorData = await response.json().catch(() => ({}));
     throw new Error(errorData.error || `Proxy error: ${response.status}`);
  }
  return await response.json();
};

export const getSubredditPosts = async (subreddit) => {
  return (await fetchFromReddit(subreddit || 'r/popular')).data.children.map(p => p.data);
};

export const getSearchResults = async (searchTerm) => {
  const response = await fetchFromReddit(`search?q=${encodeURIComponent(searchTerm)}&sort=relevance&t=all`);

  if (response.data && response.data.children) {
    return response.data.children.map((post) => post.data);
  }
  return [];
};

export const getSubreddits = async () => {
  return (await fetchFromReddit('subreddits')).data.children.map(s => s.data);
};

export const getPostComments = async (permalink) => {
  const json = await fetchFromReddit(permalink.replace(/\/$/, ''));
  return json[1].data.children.map(c => c.data);
};