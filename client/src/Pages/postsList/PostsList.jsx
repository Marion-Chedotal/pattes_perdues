import React, { useState, useEffect } from "react";
import "./PostsList.scss";
import Header from "../../Components/Header/Header";
import PostCard from "../../Components/PostCard/PostCard";
import Footer from "../../Components/Footer/Footer";
import PostService from "../../Services/PostService";

const PostsList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await PostService.getAll();
        console.log("post", postData);
        setPosts(postData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header />
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
      <Footer />
    </div>
  );
};

export default PostsList;
