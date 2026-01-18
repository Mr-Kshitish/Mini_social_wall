require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const multer = require("multer");

const app = express();
const PORT = process.env.PORT || 5000;

// -------------------- Middleware --------------------
app.use(cors());
app.use(express.json());

// make uploads folder public
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// -------------------- Multer (ONLY REQUIRED ADDITION) --------------------
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// -------------------- Mongo Model --------------------
const postSchema = new mongoose.Schema(
  {
    username: String,
    text: String,
    imageUrl: String,
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", postSchema);

// -------------------- Routes --------------------
app.post("/posts", upload.single("image"), async (req, res) => {
  try {
    const { username, text } = req.body;

    let imageUrl = null;
    if (req.file) {
      imageUrl = `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`;
    }

    const newPost = await Post.create({
      username,
      text,
      imageUrl,
    });

    res.status(201).json(newPost);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating post" });
  }
});

app.get("/posts", async (req, res) => {
  const posts = await Post.find().sort({ createdAt: -1 });
  res.json(posts);
});

// -------------------- MongoDB Connection --------------------
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () =>
      console.log(`Server running on port ${PORT}`)
    );
  })
  .catch((err) => console.error(err));
