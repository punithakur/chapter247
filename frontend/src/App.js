import './App.css';


import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import BlogList from './components/Blogs/BlogList';
import CreateBlog from './components/CreateBlog/CreateBlog';
import EditBlog from './components/Edit/EditBlog';
import Register from './components/Register/Register';

function App() {
  return (

    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/regiter" element={<Register />} />
        <Route path="/blogs" element={<BlogList />} />
        <Route path="/create-blog" element={<CreateBlog />} />
        <Route path="/edit-blog/:id" element={<EditBlog />} />
      </Routes>
    </Router>
  );
}

export default App;
