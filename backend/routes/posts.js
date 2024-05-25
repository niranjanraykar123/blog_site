const express = require('express');
const mongoose = require('mongoose');
const { Post, Comment, User } = require('../model');
const router = express.Router();
router.post('/', async (req, res) => {
    try {
        console.log(req)
        const { title, content } = req.body;
        const newPost = new Post({ title, content, author: req.body.id });
        const post = await newPost.save();
        res.json(post);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find().populate('author', 'name email');
        res.json(posts);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});


module.exports = router;