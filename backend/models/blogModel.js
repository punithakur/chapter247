import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    lastEditedBy: { type: String },
    isLocked: { type: Boolean, default: false },
    lockedBy: { type: String },
    lockedAt: { type: Date }
});

export const Blog = mongoose.model('blogs', blogSchema);
