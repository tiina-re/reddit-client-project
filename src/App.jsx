import React from 'react';
import Header from './components/Header/Header';
import Subreddits from './features/subreddits/Subreddits';
import Posts from './features/posts/Posts';

function App() {
  return (
    <div className="App">
      <Header />
      <div className="container"> 
        <main>
          <Posts />
        </main>
        <aside>
          <Subreddits />
        </aside>
      </div>
    </div>
  );
}

export default App;