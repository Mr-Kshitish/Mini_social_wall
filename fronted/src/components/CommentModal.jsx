import React, { useEffect, useState } from "react";
import { getComments, addComment } from "../services/api";

function CommentModal({ postId, closeModal }) {
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");

  useEffect(() => {
    if (!postId) return;
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      const res = await getComments(postId);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!username || !comment) return;
    await addComment(postId, { username, comment });
    setUsername("");
    setComment("");
    fetchComments();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 w-96 rounded">
        <h3 className="text-lg font-semibold mb-2">Comments</h3>
        <div className="max-h-48 overflow-y-auto mb-3 border-t border-gray-200 pt-2">
          {comments.map((c) => (
            <div key={c._id} className="mb-2 border-b border-gray-100 pb-1">
              <strong>{c.username}</strong>
              <p>{c.comment}</p>
            </div>
          ))}
          {comments.length === 0 && <p>No comments yet</p>}
        </div>
        <form onSubmit={submitComment} className="flex flex-col gap-2">
          <input
            className="border rounded p-1"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="border rounded p-1"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />
          <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
            Post
          </button>
        </form>
        <button
          onClick={closeModal}
          className="mt-2 bg-gray-300 px-3 py-1 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default CommentModal;
