import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000",
});

export const getPosts = () => API.get("/posts");
export const createPost = (data) => API.post("/posts", data);
export const likePost = (id) => API.post(`/posts/${id}/like`);
export const getComments = (id) => API.get(`/posts/${id}/comments`);
export const addComment = (id, data) => API.post(`/posts/${id}/comment`, data);
