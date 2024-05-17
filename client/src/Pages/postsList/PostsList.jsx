import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./postsList.scss";
import Header from "../../components/header/Header";
import PostCard from "../../components/postCard/PostCard";
import Footer from "../../components/footer/Footer";
import postService from "../../services/postService";
import Pagination from "../../components/pagination/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faDiamondTurnRight } from "@fortawesome/free-solid-svg-icons";
import userService from "../../services/userService";
import { capitalizeFirstLetter } from "../../utils/format";
import SuccessMessage from "../../components/successMessage/SuccessMessage";

const PostsList = () => {
  const { user, token } = useSelector((state) => state.auth);
  const currentUserId = user?.id;
  const [userCity, setUserCity] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [postsPerPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(1);
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [searchInput, setSearchInput] = useState("");
  const [noResults, setNoResults] = useState(false);
  const [showUserCityInfo, setShowUserCityInfo] = useState(true); // Nouvel état pour contrôler l'affichage des informations sur la ville de l'utilisateur

  // fetch all the posts
  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await postService.getAll();
        setPosts(postData);
        setFilteredPosts(postData);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchData();
  }, []);

  // for connected user, get the user's city
  useEffect(() => {
    const fetchUserCity = async () => {
      try {
        const userData = await userService.getUserInformation(
          currentUserId,
          token
        );
        const result = userData.city;
        setUserCity(result);
        setSearchInput(result); // Set the search input to user's city by default
      } catch (error) {
        console.error("Error fetching user city:", error);
      }
    };

    if (user) {
      fetchUserCity();
    }
  }, [currentUserId, token, user]);

  // filtered posts by type / pet category / city
  useEffect(() => {
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
    setShowUserCityInfo(false);
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
      <SuccessMessage />
      <div className="d-flex flex-column text-center my-5 gap-3">
        <Link to="/deposer-une-annonce" className="publishPost">
          <FontAwesomeIcon
            icon={faPlus}
            className="postListIcon me-3 align-middle"
          />
          Ajouter une annonce ?
        </Link>
        <Link to="/happy-endings" className="publishPost mt-5">
          <FontAwesomeIcon
            icon={faDiamondTurnRight}
            className="postListIcon me-3 align-middle border border-0"
          />
          Voir les annonces "Happy Endings" ?
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
      <div>
        {showUserCityInfo && user && (
          <div>
            <div className="d-flex justify-content-center gap-3 fw-bold">
              <p>Annonces trouvées dans votre ville:</p>
              <p>{capitalizeFirstLetter(userCity)}</p>
            </div>
            <p className="text-center mb-5">
              Utiliser les filtres pour effectuer une recherche plus précise ou
              dans une autre ville.
            </p>
          </div>
        )}
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

