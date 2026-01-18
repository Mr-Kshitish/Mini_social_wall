const express = require("express");
const router = express.Router();

const upload = require("../middleware/upload"); // multer instance
const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

// Post routes
router.get("/posts", postController.getPosts);
router.post("/posts", upload.single("image"), postController.createPost);
router.post("/posts/:id/like", postController.likePost);

// Comment routes
router.get("/posts/:id/comments", commentController.getComments);
router.post("/posts/:id/comment", commentController.addComment);

module.exports = router;
