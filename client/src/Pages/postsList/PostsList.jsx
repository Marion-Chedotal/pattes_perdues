// PostsList.js

import React, { useState, useEffect } from "react";
import "./PostsList.scss";
import Header from "../../Components/Header/Header";
import PostCard from "../../Components/PostCard/PostCard";
import Footer from "../../Components/Footer/Footer";
import PostService from "../../Services/PostService";
import Pagination from "../../Components/Pagination/Pagination";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [postsPerPage, setPostsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await PostService.getAll();
        setPosts(postData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  const prevPageHandle = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const nextPageHandle = () => {
    const numOfTotalPages = Math.ceil(posts.length / postsPerPage);
    if (currentPage !== numOfTotalPages) setCurrentPage(currentPage + 1);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const visiblePosts = posts.slice(indexOfFirstPost, indexOfLastPost)

  return (
    <div>
      <Header />
      <div className="row gy-5 my-5">
        {visiblePosts.map((post) => (
          <div
            key={post.id}
            className="d-flex justify-content-center col-lg-4 col-md-6 col-sm-12"
          >
            <PostCard post={post} />
          </div>
        ))}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          numOfTotalPages={Math.ceil(posts.length / postsPerPage)}
          prevPageHandle={prevPageHandle}
          nextPageHandle={nextPageHandle}
        />
      </div>
      <Footer />
    </div>
  );
};

export default PostsList;
