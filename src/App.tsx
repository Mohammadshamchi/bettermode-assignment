import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BlogListPage } from './pages/BlogListPage';
import { BlogPostPage } from './pages/BlogPostPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BlogListPage />} />
        <Route path="/post/:id" element={<BlogPostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
