import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./PostsList.scss";
import Header from "../../Components/Header/Header";
import PostCard from "../../Components/PostCard/PostCard";
import Footer from "../../Components/Footer/Footer";
import PostService from "../../Services/PostService";
import Pagination from "../../Components/Pagination/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const PostsList = () => {
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [postsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [noResults, setNoResults] = useState(false);

  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");
  // when owner deleting post, he is redirect here with success message.
  const location = useLocation();
  useEffect(() => {
    if (location.state && location.state.deleteSuccessMessage) {
      setDeleteSuccessMessage(location.state.deleteSuccessMessage);
    }
  }, [location]);
  useEffect(() => {
    if (deleteSuccessMessage) {
      const timer = setTimeout(() => {
        setDeleteSuccessMessage("");
      }, 5000); // 5000ms = 5 secondes
      return () => clearTimeout(timer);
    }
  }, [deleteSuccessMessage]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await PostService.getAll();
        setPosts(postData);
        setFilteredPosts(postData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // filtered posts by type / pet category / city
    const filtered = posts
      .filter((post) => post.Type.label === typeFilter || typeFilter === "all")
      .filter(
        (post) =>
          post.Pet_category.label === categoryFilter || categoryFilter === "all"
      )
      .filter((post) =>
        post.Address.city.toLowerCase().includes(searchInput.toLowerCase())
      );

    if (filtered.length === 0) {
      setNoResults(true);
    } else {
      setNoResults(false);
    }

    setFilteredPosts(filtered);
  }, [posts, typeFilter, categoryFilter, searchInput]);

  const handleTypeFilterChange = (e) => {
    setTypeFilter(e.target.value);
  };

  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };

  const handleInputChange = (e) => {
    setSearchInput(e.target.value);
  };

  // pagination
  const prevPageHandle = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  const nextPageHandle = () => {
    const numOfTotalPages = Math.ceil(filteredPosts.length / postsPerPage);
    if (currentPage !== numOfTotalPages) setCurrentPage(currentPage + 1);
  };

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const visiblePosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <div className="postList">
      <Header />
      {deleteSuccessMessage && (
        <div className="successDelete text-center alert alert-success">{deleteSuccessMessage}</div>
      )}
      <div className="d-flex justify-content-center my-5">
        <Link to="/deposer-une-annonce" className="publishPost">
          <FontAwesomeIcon
            icon={faPlus}
            className="plusIcone me-3 align-middle"
          />
          Ajouter une annonce ?
        </Link>
      </div>
      <div className="d-flex flex-column flex-sm-row justify-content-around align-items-center my-5">
        <select
          value={typeFilter}
          onChange={handleTypeFilterChange}
          className="mb-3"
        >
          <option value="all">Toutes les types</option>
          <option value="Perdu">Perdus</option>
          <option value="Trouvé">Trouvés</option>
          <option value="Volé">Volés</option>
        </select>
        <select
          value={categoryFilter}
          onChange={handleCategoryFilterChange}
          className="mb-3"
        >
          <option value="all">Toutes les catégories</option>
          <option value="Chiens">Chiens</option>
          <option value="Chats">Chats</option>
          <option value="Autres">Autres</option>
        </select>
        <input
          type="text"
          value={searchInput}
          onChange={handleInputChange}
          placeholder="Recherche par ville"
          className="mb-3"
        />
      </div>
      <div className="row gy-5">
        {noResults ? (
          <p className="text-center fw-bold">
            Aucune annonce correspondant aux critères de recherche.
          </p>
        ) : (
          visiblePosts.map((post) => (
            <div
              key={post.id}
              className="d-flex justify-content-center col-lg-4 col-md-6 col-sm-12"
            >
              <PostCard post={post} />
            </div>
          ))
        )}
        {filteredPosts.length > 0 && (
          <Pagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            numOfTotalPages={Math.ceil(filteredPosts.length / postsPerPage)}
            prevPageHandle={prevPageHandle}
            nextPageHandle={nextPageHandle}
          />
        )}
      </div>
      <Footer />
    </div>
  );
};

export default PostsList;
