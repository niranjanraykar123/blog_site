const express = require('express');
const { Comment, Post } = require('../model');
const { ensureAuthenticated } = require('../middleware/auth');
const router = express.Router();

// Create a new comment
router.post('/:postId', ensureAuthenticated, async (req, res) => {
    try {
        const { content } = req.body;
        // const author = req.user.id;
        const author = "6651983e3a26ebb34fb6d4c4";
        const postId = req.params.postId;

        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        const newComment = new Comment({ content, author, post: postId });
        const comment = await newComment.save();

        // Add comment to the post's comments array
        post.comments.push(comment);
        await post.save();

        res.json(comment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all comments for a specific post
router.get('/:postId', async (req, res) => {
    try {
        const comments = await Comment.find({ post: req.params.postId }).populate('author', 'name email');
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update a comment by ID
router.put('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const { content } = req.body;
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        // if (comment.author.toString() !== req.user.id) 
        if (comment.author.toString() !== "6651983e3a26ebb34fb6d4c4") {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        comment.content = content;
        const updatedComment = await comment.save();
        res.json(updatedComment);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete a comment by ID
router.delete('/:id', ensureAuthenticated, async (req, res) => {
    try {
        const comment = await Comment.findById(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: 'Comment not found' });
        }

        if (comment.author.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Unauthorized' });
        }

        await comment.remove();

        // Also remove the comment from the post's comments array
        await Post.findByIdAndUpdate(comment.post, { $pull: { comments: comment.id } });

        res.json({ message: 'Comment deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
