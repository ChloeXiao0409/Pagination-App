import React, { useState, useEffect } from "react";
import Pagination from "./components/Pagination";
import Posts from "./components/Posts";
import "./App.css";
import axios from "axios";

export default function App() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const url = "https://jsonplaceholder.typicode.com/posts";
      const res = await axios.get(url);
      console.log("res", res);
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  //Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  //Change Page -> son sending to father -> call-back func
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h1 className="text-primary">My Posts</h1>
      <Posts currentPosts={currentPosts} loading={loading} />
      <Pagination
        paginate={paginate}
        postsPerPage={postsPerPage}
        currentPage={currentPage}
        totalPosts={posts.length}
      />
    </div>
  );
}
