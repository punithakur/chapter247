import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './createBlog.css';
import { createBlog } from '../../Api/api';

const CreateBlog = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleCreate = async (e) => {
        e.preventDefault();

        const token = localStorage.getItem('token');
        if (!token) {
            setError('You must be logged in to create a blog.');
            return;
        }

        try {
            
            await createBlog(title, content)
            navigate('/blogs'); 
        } catch (error) {
            setError('Error creating blog. Please try again.');
        }
    };

    return (
        <div className="create-blog-container">
            <h2>Create New Blog</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleCreate}>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Blog Title"
                    required
                />
                <textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Blog Content"
                    required
                ></textarea>
                <button type="submit">Create Blog</button>
            </form>
        </div>
    );
};

export default CreateBlog;
