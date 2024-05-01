import React, { useState, useEffect } from "react";
import PostService from "../../Services/PostService";
import PostCard from "../../Components/PostCard/PostCard";
import { useParams } from "react-router-dom";

const UserPosts = () => {
  const { login } = useParams();
  const [posts, setPosts] = useState([]);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const userPosts = await PostService.getUserPosts(login);
        setPosts(userPosts);
        if (userPosts.length === 0) return setNoResults(true);
        setNoResults(false);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchUserPosts();
  }, []);

  return (
    <div>
      <div className="row gy-5">
        {noResults ? (
          <p className="text-center fw-bold">
            Vous n'avez pas encore publié d'annonce.
          </p>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="d-flex justify-content-center col-lg-4 col-md-6 col-sm-12"
            >
              <PostCard post={post} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default UserPosts;
