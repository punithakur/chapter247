import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './blogs.css';
import { unlockBlog, fetchBlog } from '../../Api/api';

const Blogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState('');
    const [currentUserId, setCurrentUserId] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlogs = async () => {
            const token = localStorage.getItem('token');
            const userId = localStorage.getItem('userId'); 

            if (!token || !userId) {
                setError('Authentication token or user ID not found. Please log in.');
                return;
            }

            setCurrentUserId(userId); 

            try {
                const { data } = await fetchBlog();
                setBlogs(data);
            } catch (error) {
                console.error('Error fetching blogs:', error);
                setError('Failed to fetch blogs. Please try again.');
            }
        };

        fetchBlogs();
    }, []);

    const handleUnlock = async (blogId) => {
        try {
            await unlockBlog(blogId); 
            alert('Blog unlocked successfully');
            const { data } = await fetchBlog();
            setBlogs(data);
        } catch (error) {
            console.error('Error unlocking blog:', error);
            alert('Failed to unlock blog.');
        }
    };

    const handleEdit = (blogId) => {
        navigate(`/edit-blog/${blogId}`);
    };

    const handleCreateBlog = () => {
        navigate('/create-blog');  
    };


    return (
        <div className="blogs-container">
            <h2>Blogs</h2>
            {error && <p className="error-message">{error}</p>}
            <div className="create-blog">
                <button onClick={handleCreateBlog}>Create New Blog</button>  
            </div>
            <div className="blog-list">
                {blogs.length > 0 ? (
                    blogs.map(blog => (
                        <div key={blog._id} className="blog-card">
                            <h3>{blog.title}</h3>
                            <p>{blog.content.slice(0, 100)}...</p>

                            {
                                blog.lockedBy === currentUserId ? (
                                    <span>
                                        <span><button onClick={() => handleUnlock(blog._id)}>Unlock</button> </span>
                                        <span><button onClick={() => handleEdit(blog._id)}>Edit Blog</button></span>
                                    </span>
                                ) : (
                                    <button onClick={() => handleEdit(blog._id)}>Edit Blog</button>
                                )
                            }
                        </div>
                    ))
                ) : (
                    <p>No blogs available</p>
                )}
            </div>
        </div>
    );
};

export default Blogs;
