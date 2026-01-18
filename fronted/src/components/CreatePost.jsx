import React from "react";
import { createPost } from "../services/api";

function CreatePost() {
  const submitPost = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await createPost(formData);
      e.target.reset();
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Error creating post");
    }
  };

  return (
    <form
      onSubmit={submitPost}
      className="flex flex-col gap-3 mb-6 bg-white p-4 rounded shadow"
    >
      <input
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
      <input type="file" name="image" className="border rounded p-1" />
      <button className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600">
        Create Post
      </button>
    </form>
  );
}

export default CreatePost;
