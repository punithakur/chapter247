import axios from 'axios';
const api = axios.create({
    baseURL: 'http://localhost:5000/api',
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const login = (username, password) => {
    return api.post('/auth/login', { username, password });
};

export const register = (username, password) => {
    return api.post('/auth/register', { username, password });
};

export const fetchBlog = () => {
    return api.get('/blogs');
};

export const fetchBlogById = (blogId) => {
    return api.get(`/blogs/${blogId}`);
};

export const createBlog = (title, content) => {
    return api.post('/blogs', { title, content });
};

export const editBlog = (blogId, updatedData) => {
    return api.put(`/blogs/${blogId}`, updatedData);
};

export const unlockBlog = (blogId) => {
    return api.put(`/blogs/${blogId}/unlock`);
};

