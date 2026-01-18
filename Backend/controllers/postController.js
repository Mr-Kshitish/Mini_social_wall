const Post = require("../models/Post");
const Comment = require("../models/Comment");
const path = require("path");

// Get all posts
exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find().sort({ created_at: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Create a post

exports.createPost = async (req, res) => {
  try {
    const { username, text } = req.body;

    const image_url = req.file ? req.file.filename : null;

    const post = new Post({
      username,
      text,
      image_url,
    });

    await post.save();

    res.status(201).json({
      success: true,
      post,
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
};


// Like a post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    post.likes += 1;
    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a comment
exports.addComment = async (req, res) => {
  try {
    const { username, comment } = req.body;
    const newComment = new Comment({
      post_id: req.params.id,
      username,
      comment,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get comments for a post
exports.getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ post_id: req.params.id }).sort({
      created_at: -1,
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
