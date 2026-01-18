import React from "react";
import CreatePost from "./components/CreatePost";
import Feed from "./pages/Feed";

function App() {
  return (
    <div className="max-w-2xl mx-auto p-4 font-sans">
      <h1 className="text-3xl font-bold text-center mb-6 text-blue-600">
        Mini Social Wall
      </h1>

      <CreatePost />
      <Feed />
    </div>
  );
}

export default App;
