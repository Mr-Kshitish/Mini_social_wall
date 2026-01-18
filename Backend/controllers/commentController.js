const Comment = require("../models/Comment");

// Get all comments for a post
exports.getComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const comments = await Comment.find({ post_id: postId }).sort({
      created_at: -1,
    });
    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Add a comment to a post
exports.addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const { username, comment } = req.body;

    if (!username || !comment) {
      return res.status(400).json({ error: "Username and comment required" });
    }

    const newComment = new Comment({
      post_id: postId,
      username,
      comment,
    });

    await newComment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
