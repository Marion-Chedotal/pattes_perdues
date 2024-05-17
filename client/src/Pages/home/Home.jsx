import "./home.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Image, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faEye,
  faLocationDot,
  faBullhorn,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import chien from "../../assets/chien_home.jpg";
import sparkles from "../../assets/sparkles.png";
import Button from "../../components/btn/Button";
import postService from "../../services/postService";
import PostCard from "../../components/postCard/PostCard";

const Home = () => {
  const [lastThreePosts, setLastThreePosts] = useState([]);
  const [lastThreeArchivesPosts, setLastThreeArchivesPosts] = useState([]);
  const [deleteSuccessMessage, setDeleteSuccessMessage] = useState("");

  // when owner deleting his account, he is redirect here with success message.
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
      }, 5000); // 5 seconds
      return () => clearTimeout(timer);
    }
  }, [deleteSuccessMessage]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postData = await postService.getLastThreeArchivesPosts();
        setLastThreeArchivesPosts(postData);
      } catch (error) {
        console.error("Error fetching the last archives posts:", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchLastestPosts = async () => {
      try {
        const post = await postService.getLastThreePosts();
        setLastThreePosts(post);
      } catch (error) {
        console.error("Error fetching the last 3 posts:", error);
      }
    };
    fetchLastestPosts();
  }, []);

  return (
    <div>
      <Header />
      {deleteSuccessMessage && (
        <div className="successDelete text-center alert alert-success">
          {deleteSuccessMessage}
        </div>
      )}
      <main className="home">
        <Container fluid className="presentation mt-5 ">
          <Row>
            <Col
              className={`my-5 d-flex justify-content-center justify-content-md-${
                window.innerWidth >= 768 ? "center" : "start"
              } text-center text-md-start`}
            >
              <div className="card border border-0">
                <h2 className="card-header display-6 pb-5 border border-0 text-center">
                  Pattes perdues
                </h2>
                <div className="card-body ms-auto text-center introduction d-flex justify-content-center align-items-center">
                  <p className="card-text fw-bold">
                    facilite votre démarche pour vous aider à retrouver vos
                    animaux grâces à notre communauté !
                  </p>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center justify-content-center">
            <Col md={8}>
              <div className="d-flex align-items-center mb-4">
                <hr className="flex-grow-1 hr border-2" />
                <h3 className="ms-4">Comment ?</h3>
              </div>

              <dl className="how p-3">
                <div className="d-flex align-items-center pb-3">
                  <FontAwesomeIcon icon={faPaw} />
                  <dt className="ps-3">Vous avez perdu votre animal ?</dt>
                </div>
                <ol>
                  <li>
                    Regarder les annonces pour voir s'il a été trouvé par
                    quelqu'un.
                  </li>
                  <li>
                    Publiez une annonce pour que la communauté puisse ouvrir
                    l'oeil !
                  </li>
                </ol>
                <div className="d-flex align-items-center py-4">
                  <FontAwesomeIcon icon={faLocationDot} />
                  <dt className="ps-3">Vous avez trouvé un animal ?</dt>
                </div>
                <ol>
                  <li>
                    Regardez les annonces pour voir s'il correspond à un animal
                    perdu et contacter le propriétaire !
                  </li>
                  <li>Publier une annonce pour informer la communauté !</li>
                </ol>
              </dl>
            </Col>
            <Col md={3} className="text-center mt-5 d-none d-md-block">
              <Image
                alt="chien type labrador"
                src={chien}
                title="Photo de Ryan Walton sur Unsplash"
                className="introImg"
                thumbnail
              />
            </Col>
          </Row>
          <Row className="postCard row-cols-2 mt-5">
            <Col md={6}>
              <div className="mb-5 seePost mx-auto text-center">
                <Link to="/annonces">
                  <Button type="button">
                    <FontAwesomeIcon icon={faEye} className="me-1" />
                    Voir les annonces
                  </Button>
                </Link>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-5 publishPost mx-auto text-center">
                <Link to="/deposer-une-annonce">
                  <Button type="button">
                    <FontAwesomeIcon icon={faBullhorn} className="me-3" />
                    Publier une annonce
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
        <Container fluid className="happyEndings pb-5">
          <Row className="align-items-center justify-content-center mb-5">
            <Col className="text-center">
              <div className="d-flex align-items-center justify-content-center">
                <Image alt="étoiles" src={sparkles} className="iconStar" />
                <h3 className="">Happy Endings</h3>
                <Image alt="étoiles" src={sparkles} className="iconStar" />
              </div>
              <span className="fs-4">Ils ont retrouvé leur propriétaire !</span>
            </Col>
          </Row>
          <Row className="">
            {lastThreeArchivesPosts.map((post) => (
              <Col
                key={post.id}
                lg={4}
                md={6}
                sm={12}
                className="mb-4 d-flex align-items-center justify-content-center"
              >
                <PostCard post={post} />
              </Col>
            ))}
          </Row>
        </Container>
        <Container fluid className=" pb-5">
          <Row className="align-items-center justify-content-center my-5">
            <Col className="text-center">
              <div className="d-flex align-items-center justify-content-center gap-4">
                <h3 className="">Dernières annonces parues</h3>
                <FontAwesomeIcon icon={faMagnifyingGlass} className="loupeIcon" />
              </div>
            </Col>
          </Row>
          <Row className="">
            {lastThreePosts.map((post) => (
              <Col
                key={post.id}
                lg={4}
                md={6}
                sm={12}
                className="mb-4 d-flex align-items-center justify-content-center"
              >
                <PostCard post={post} />
              </Col>
            ))}
          </Row>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
