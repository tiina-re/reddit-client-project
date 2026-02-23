app.get('/api/reddit/*', async (req, res) => {
    await new Promise(resolve => setTimeout(resolve, 2000));

    let redditPath = req.params[0];

    if (redditPath.includes('.json.json')) {
        redditPath = redditPath.replace('.json.json', '.json');
    }

    const url = `https://www.reddit.com/${redditPath}`;

    console.log(`--- Proxy Request Log ---`);
    console.log(`Target URL: ${url}`);
    console.log(`Using ID: (by /u/tiina_re)`);

    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'web:reddit-clone-app:v1.0 (by /u/tiina_re)',
                'Accept': 'application/json',
                'Accept-Language': 'en-US,en;q=0.9',
                'Referer': 'https://www.reddit.com/',
                'Origin': 'https://www.reddit.com',
                'Cache-Control': 'no-cache'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error("Reddit API Error:", error.response?.status || error.message);
        res.status(error.response?.status || 500).json({
            error: 'Reddit is blocking this request',
            status: error.response?.status
        });
    }
});