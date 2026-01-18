import React, { useState } from "react";
import { createPost } from "../services/api";

function CreatePost({ onPostCreated }) {
  const [loading, setLoading] = useState(false);

  const submitPost = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    try {
      // Backend should return the created post (with imageUrl)
      const response = await createPost(formData);

      // Send new post data to parent component
      if (onPostCreated) {
        onPostCreated(response.data);
      }

      form.reset();
    } catch (err) {
      console.error(err);
      alert("Error creating post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={submitPost}
      encType="multipart/form-data"
      className="flex flex-col gap-3 mb-6 bg-white p-4 rounded shadow"
    >
      <input
        type="text"
        name="username"
        placeholder="Username"
        required
        className="border rounded p-2"
      />

      <textarea
        name="text"
        placeholder="What's on your mind?"
        required
        className="border rounded p-2"
      />

      <input
        type="file"
        name="image"
        accept="image/*"
        className="border rounded p-1"
      />

      <button
        type="submit"
        disabled={loading}
        className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:opacity-50"
      >
        {loading ? "Posting..." : "Create Post"}
      </button>
    </form>
  );
}

export default CreatePost;
