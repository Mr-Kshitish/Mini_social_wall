import React, { useState } from "react";
import { likePost } from "../services/api";
import CommentModal from "./CommentModal";

function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false);

  if (!post) return null;

  const handleLike = async () => {
    try {
      await likePost(post._id);
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h3 className="font-semibold text-lg">{post.username}</h3>
      <p className="my-2">{post.text}</p>
      {post.image_url && (
  <img
    src={`http://localhost:5000/uploads/${post.image_url}`}
    alt="post"
    className="rounded mt-2"
  />
)}

      <div className="flex gap-3">
        <button
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          onClick={handleLike}
        >
          ❤️ {post.likes || 0}
        </button>
        <button
          className="bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
          onClick={() => setShowComments(true)}
        >
          💬 Comments
        </button>
      </div>

      {showComments && post._id && (
        <CommentModal postId={post._id} closeModal={() => setShowComments(false)} />
      )}
    </div>
  );
}

export default PostCard;
