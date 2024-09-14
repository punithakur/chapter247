import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './editBlogs.css'; 
import { editBlog, fetchBlogById } from '../../Api/api';

const EditBlog = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState({ title: '', content: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBlog = async () => {
            const token = localStorage.getItem('token');

            if (!token) {
                setError('Authentication token not found. Please log in.');
                return;
            }

            try {
               
                const { data } = await fetchBlogById(id)
                setBlog({ title: data.title, content: data.content });
            } catch (error) {
                console.log(Object.values(error.response))
                console.log(error.response.data.error)
                console.error('Error fetching blog details:', error);
                setError(error.response.data.error);
            }
        };

        fetchBlog();
    }, [id]);

    const handleUpdate = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId'); 
        let payload = {userId,...blog}
        if (!token) {
            setError('Authentication token not found. Please log in.');
            return;
        }

        try {
            
            await editBlog(id, payload)
            alert('Blog updated successfully');
            navigate('/blogs');
        } catch (error) {
            console.error('Error updating blog:', error);
            setError('Failed to update the blog.');
        }
    };

    return (
        <div className="edit-blog-container">
            <div className="edit-blog-box">
                <h2>Edit Blog</h2>
                {error ? <p className="error-message">{error}</p>
                :
                    <form onSubmit={handleUpdate}>
                        <input
                            type="text"
                            value={blog.title}
                            onChange={(e) => setBlog({ ...blog, title: e.target.value })}
                            placeholder="Blog Title"
                        />
                        <textarea
                            value={blog.content}
                            onChange={(e) => setBlog({ ...blog, content: e.target.value })}
                            placeholder="Blog Content"
                            rows="10"
                        />
                        <button type="submit">Update Blog</button>
                    </form>
                } 
                
            </div>
        </div>
    );
};

export default EditBlog;
