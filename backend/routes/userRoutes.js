const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Activity = require('../models/Activity');
const Comment = require('../models/Comment');
const Post = require('../models/Post');

// Get user profile
router.get('/profile/:userId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
      .populate('activities')
      .populate('comments')
      .populate('favoritePosts');
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// Update favorite posts
router.post('/profile/:userId/favorite', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);
    user.favoritePosts.push(req.body.postId);
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

module.exports = router;