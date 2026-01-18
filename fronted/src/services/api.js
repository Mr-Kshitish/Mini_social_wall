import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000", 
});


export const getPosts = async () => {
  const res = await API.get("/posts");
  return res.data;
};

export const createPost = async (data) => {
  console.log(data)
  const res = await API.post("/posts", data); 
  return res.data;

};

export const likePost = async (id) => {
  const res = await API.post(`/posts/${id}/like`);
  return res.data;
};

export const getComments = async (id) => {
  const res = await API.get(`/posts/${id}/comments`);
  return res.data;
};

export const addComment = async (id, data) => {
  const res = await API.post(`/posts/${id}/comment`, data);
  return res.data;
};
