# Reddit-Lite Clone

A functional, responsive Reddit client built with **React** and **Redux Toolkit**. This application utilizes the Reddit JSON API to fetch and display real-time community data, providing a seamless browsing experience.

## Wireframes
The application follows a classic "Feed and Sidebar" layout:
* **Main Feed**: Central column for posts with functional upvote/downvote displays.
* **Sidebar**: Navigation for subreddits and community categories.
* **Search**: Top-level navigation bar for real-time post filtering.

## Technologies Used
* **React**: Frontend library for building the user interface.
* **Redux Toolkit**: Managed global state for posts, search terms, and subreddit selection.
* **React Router (v6)**: Handles navigation between the main feed and detailed post views.
* **CSS3**: Custom styling, including:
    * **Shimmering Loading Skeletons** to improve perceived performance.
    * **Custom Webkit Scrollbars** for a consistent, polished look.
    * **Responsive Flexbox/Grid** layouts.
* **Reddit JSON API**: Data source for real-time Reddit content.

## Features
* **Real-time Data**: Fetches live posts from various subreddits.
* **Subreddit Navigation**: Click any subreddit in the sidebar to instantly update the feed.
* **Live Search**: A functional search bar that filters the current feed using Redux state.
* **Visual Polish**: Integrated Loading Skeletons with shimmer effects to provide a smooth user experience during data transitions.
* **Intelligent Routing**: Automatically redirects users from the detail view back to the main feed when a new subreddit is selected.
* **Responsive Design**: Fully functional across mobile, tablet, and desktop views.

## How to Run

1. **Clone the repo**:
   ```bash
   git clone [https://github.com/tiina-re/reddit-client-project.git](https://github.com/tiina-re/reddit-client-project.git)

2. **Install dependencies**:
Bash
npm install

3. **Start the development server**:
Bash
npm start
Open in browser:
Navigate to http://localhost:3000

## Future Work

- Scoped Search: Enhance the search functionality to allow users to search for keywords within a specifically selected subreddit, rather than just filtering the current view.
- Post Sorting & Filtering: Implement the ability to sort posts by Hot, New, Top, and Rising. This will involve updating the API logic to fetch different endpoints (e.g., reddit.com/r/pics/top.json).
- Dark Mode: Adding a theme switcher for better accessibility.
- Infinite Scroll: Moving from static fetching to a continuous scroll experience.

## Lessons Learned
During development, I overcame several technical hurdles:

- Routing Logic: Solved "Post Not Found" errors by ensuring the app navigates back to the main feed whenever a new subreddit is selected from the detail view.
- CSS Refinement: Overrode default browser focus outlines and dark scrollbar backgrounds to maintain a clean, custom design system.
- Component Composition: Broke the app down from one giant file into smaller, reusable components like Post, SearchBar, and Subreddits. This made debugging issues much faster because the logic was isolated.
- Global vs. Local State: Had to decide which data should live in Redux (like the selectedSubreddit) and which should stay local (like a simple toggle). This helped me understand when to use a global store versus standard React useState.
