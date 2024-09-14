import { Blog } from '../models/blogModel.js';

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find();
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blogs' });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        // console.log(blog, blog.lockedBy , req.user._id)
        if (blog.isLocked && blog.lockedBy !== req.user.userId ) return res.status(500).json({ error: 'Blog is currently being edited by another user' });
        blog.isLocked = true;
        blog.lockedBy = req.user.userId;
        blog.lockedAt = new Date();
        console.log("getBlogById", req.user)
        await blog.save();
       
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch blog' });
    }
};

export const editBlog = async (req, res) => {
    const { title, content, userId } = req.body;

    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ error: 'Blog not found' });

        // if (blog.isLocked && blog.lockedBy !== userId) {
        //     return res.status(403).json({ error: 'Blog is currently being edited by another user' });
        // }

        blog.isLocked = false;
        blog.lockedBy = null;
        blog.lockedAt = new Date();
        blog.title = title;
        blog.content = content;
        blog.lastEditedBy = userId;
        console.log("editBlog",blog)
        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to edit blog' });
    }
};

export const unlockBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        console.log(blog)
        if (!blog) return res.status(404).json({ error: 'Blog not found' });
        blog.isLocked = false;
        blog.lockedBy = null;
        blog.lockedAt = null;

        await blog.save();
        res.status(200).json(blog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to unlock blog' });
    }
};

export const createBlog = async (req, res) => {
    const { title, content, userId } = req.body;

    try {
        const newBlog = new Blog({
            title,
            content,
            lastEditedBy: userId,
            isLocked: false,
            lockedBy: null,
            lockedAt: null
        });

        const savedBlog = await newBlog.save();
        res.status(201).json(savedBlog);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create blog post' });
    }
};
