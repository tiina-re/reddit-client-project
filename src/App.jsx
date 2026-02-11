import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Subreddits from './features/subreddits/Subreddits';
import Posts from './features/posts/Posts';
import PostDetail from './features/posts/PostDetail';
import NotFound from './components/NotFound/NotFound';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container"> 
          <main>
            <Routes>
              {/* Main Feed View */}
              <Route path="/" element={<Posts />} />
              
              {/* Detailed Post View */}
              <Route path="/comments/:postId" element={<PostDetail />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
          <aside>
            <Subreddits />
          </aside>
        </div>
      </div>
    </Router>
  );
}

export default App;