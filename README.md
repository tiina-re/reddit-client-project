Reddit-Lite Clone

A functional, responsive Reddit client built with React and Redux Toolkit. This application utilizes the Reddit JSON API to fetch and display real-time community data.

**Wireframes**

The application follows a classic "Feed and Sidebar" layout:
- Main Feed: Central column for posts with upvote/downvote, comment and share buttons.
- Sidebar: Navigation for subreddits and community categories.
- Search: Top-level navigation bar for real-time post filtering.
- Comments: Threaded discussions with deep nesting support for post detail views.


<img width="720" height="626" alt="Desktop - Main view" src="https://github.com/user-attachments/assets/f495390d-c7d2-44c8-8a1d-855883ceb2ab" />


<img width="201" height="305" alt="iPhone 16   17 Pro - Main view" src="https://github.com/user-attachments/assets/29aa6e39-a6a2-4a9b-9e49-7407c8c2d811" />  


    
**Technologies Used**

- React: Frontend library for building the user interface.
- Redux Toolkit: Managed global state for posts, search terms, and subreddit selection.
- Vitest & React Testing Library: Used for integration testing and verifying state transitions.
- React Router (v6): Handles navigation between the main feed and detailed post views.
- CSS3: Custom styling including Shimmering Loading Skeletons and responsive layouts.
- Reddit JSON API: Data source for real-time Reddit content.

**Features**
- Real-time Data: Fetches live posts from various subreddits.
- Subreddit Navigation: Click any subreddit in the sidebar to instantly update the feed.
- Live Search: A functional search bar that filters the current feed using Redux state.
- Visual Polish: Integrated Loading Skeletons with shimmer effects to provide a smooth user experience during data transitions.
- Responsive Design: Fully functional across mobile, tablet, and desktop views.
  

**How to Run**
Clone the repo:
git clone https://github.com/tiina-re/reddit-client-project.git

Install dependencies:
npm install

Start the development server:
npm start

Run tests:
npx vitest


**Future Work**

- Scoped Search: Enhance the search functionality to allow users to search for keywords within a specifically selected subreddit.

- Post Sorting & Filtering: Implement the ability to sort posts by Hot, New, Top, and Rising.

- Dark Mode: Adding a theme switcher for better accessibility.

Infinite Scroll: Moving from static fetching to a continuous scroll experience.
