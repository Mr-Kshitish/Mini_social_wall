import React, { useEffect, useState } from "react";
import { getPosts } from "../services/api";
import PostCard from "../components/PostCard";

function Feed() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        
        const res = await getPosts();
        console.log(res)
        setPosts(res || []);
         // SAFE

      } catch (err) {
        console.error("Error fetching posts:", err);
        setPosts([]); // fallback
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <p className="text-center">Loading posts...</p>;

  if (!Array.isArray(posts) || posts.length === 0)
    return <p className="text-center">No posts yet.</p>;

  return (
    <div className="flex flex-col gap-4">
      {posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))}
    </div>
  );
}

export default Feed;
