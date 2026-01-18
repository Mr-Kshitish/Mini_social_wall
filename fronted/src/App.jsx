import React from "react";
import CreatePost from "./components/CreatePost";
import Feed from "./pages/Feed";

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 p-6">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-6">
          Mini Social Wall
        </h1>

        <CreatePost />
        <Feed />
      </div>
    </div>
  );
}

export default App;
