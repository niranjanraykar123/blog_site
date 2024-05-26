const express = require('express');
const mongoose = require('mongoose');
const { Post, Comment, User } = require('../model');
const { ensureAuthenticated } = require('../middleware/auth'); // Import authentication middleware
const router = express.Router();

// Create a new post
router.post('/', ensureAuthenticated, async (req, res) => {
    try {
        const { title, content } = req.body;
        const author = req.body.id; // Assuming user ID is available in the request after authentication
        // const author = "6651983e3a26ebb34fb6d4c4"; // Assuming user ID is available in the request after authentication
        const newPost = new Post({ title, content, author });
        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all posts
router.get('/', ensureAuthenticated, async (req, res) => {
    try {
        // console.log(req.user);
        const posts = await Post.find().populate('author', 'name email');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get a specific post by ID
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findById(req.params.id).populate('author', 'name email');
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a post by ID
router.put('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const { title, content } = req.body;
        // console.log(title);
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, { title, content }, { new: true });
        if (!updatedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        res.json(updatedPost);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a post by ID
router.delete('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const deletedPost = await Post.findByIdAndDelete(req.params.id);
        if (!deletedPost) {
            return res.status(404).json({ message: 'Post not found' });
        }
        // Also delete associated comments
        await Comment.deleteMany({ post: req.params.id });
        res.json({ message: 'Post deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
