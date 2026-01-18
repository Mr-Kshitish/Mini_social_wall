const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");

const postController = require("../controllers/postController");
const commentController = require("../controllers/commentController");

// Multer config for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// Post routes
router.get("/posts", postController.getPosts);
router.post("/posts", upload.single("image"), postController.createPost);
router.post("/posts/:id/like", postController.likePost);

// Comment routes
router.get("/posts/:id/comments", commentController.getComments);
router.post("/posts/:id/comment", commentController.addComment);

module.exports = router;
