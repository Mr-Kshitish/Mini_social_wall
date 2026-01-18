import React, { useEffect, useState } from "react";
import { getComments, addComment } from "../services/api";

function CommentModal({ postId, closeModal }) {
  const [comments, setComments] = useState([]);
  const [username, setUsername] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!postId) return;
    fetchComments();
  }, [postId]);

  const fetchComments = async () => {
    try {
      setLoading(true);
      const res = await getComments(postId);
      setComments(res?.data?.comments || []);
    } catch (err) {
      console.error("Error fetching comments:", err);
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  const submitComment = async (e) => {
    e.preventDefault();
    if (!username.trim() || !comment.trim()) return;

    try {
      await addComment(postId, { username, comment });
      setUsername("");
      setComment("");
      closeModal(); // ✅ close modal after submit
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 w-96 rounded-lg shadow-lg">
        <h3 className="text-lg font-semibold mb-3 text-center">
          Comments
        </h3>

        <div className="max-h-48 overflow-y-auto mb-4 border-t pt-2">
          {loading && <p className="text-center">Loading...</p>}

          {!loading && comments.length === 0 && (
            <p className="text-center text-gray-500">
              No comments yet
            </p>
          )}

          {comments.map((c) => (
            <div key={c._id} className="mb-2 border-b pb-1">
              <strong>{c.username}</strong>
              <p className="text-sm">{c.comment}</p>
            </div>
          ))}
        </div>

        <form onSubmit={submitComment} className="flex flex-col gap-2">
          <input
            type="text"
            className="border rounded p-2"
            placeholder="Your name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            type="text"
            className="border rounded p-2"
            placeholder="Add a comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            required
          />

          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Post Comment
          </button>
        </form>

        <button
          onClick={closeModal}
          className="mt-3 w-full bg-gray-300 py-1 rounded hover:bg-gray-400"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default CommentModal;
