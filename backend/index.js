import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { authRouter } from './routes/authRoutes.js';
import { blogRouter } from './routes/blogRoutes.js';
import cors from 'cors'

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors())

// mongoDB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB connection error:', err));

// routes
app.use('/api/auth', authRouter);
app.use('/api/blogs', blogRouter);

// server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
