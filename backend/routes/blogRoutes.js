import express from 'express';
import { getAllBlogs, getBlogById, createBlog, editBlog, unlockBlog } from '../controllers/blogController.js';
import { auth } from '../controllers/authController.js';

const router = express.Router();

router.get('/', auth, getAllBlogs);
router.get('/:id', auth, getBlogById);
router.post('/', auth, createBlog);
router.put('/:id', auth, editBlog);
router.put('/:id/unlock', auth, unlockBlog);

export const blogRouter = router;
