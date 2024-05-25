import React, { useEffect, useState } from "react";
import "./privateRoute.scss";
import { Link, useParams, Navigate} from "react-router-dom";
import Header from "../../components/header/Header";
import Button from "../btn/Button";
import { Image, Container, Row, Col } from "react-bootstrap";
import affiche from "../../assets/affiche_animal_perdu.jpg";
import { useSelector } from "react-redux";
import postService from "../../services/postService";
import userService from "../../services/userService";

const PrivateRoute = ({ children, isOwner, isCurrentUser }) => {
  const { isAuthenticated, user, token } = useSelector((state) => state.auth);
  const { id: postId, login: userLogin } = useParams();
  const [post, setPost] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        if (isOwner && postId) {
          const fetchedPost = await postService.getOne(postId);
          setPost(fetchedPost);
        } else if (isCurrentUser && userLogin) {
          const fetchedUser = await userService.getUserByLogin(
            userLogin,
            token
          );
          setUserProfile(fetchedUser);
        }
      } catch (error) {
        console.error("Error fetching details:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [postId, userLogin, token, isOwner, isCurrentUser]);

  if (!isAuthenticated || !user) {
    return (
      <>
        <Header />
        <Container className="my-5 private">
          <Row className="align-items-center">
            <Col xs={12} md={6} className="mb-3">
              <div className="mb-3">
                <span>Bonjour !</span>
              </div>
              <div>
                <p className="mb-3">
                  Connectez-vous ou créez un compte pour pouvoir accéder à
                  l'ensemble des ressources!
                </p>
              </div>
              <div className="d-flex flex-column flex-md-row justify-content-center text-center">
                <Link to="/login" className="me-md-3 mb-2 mb-md-0">
                  <Button type="button">Connexion</Button>
                </Link>
                <Link to="/register">
                  <Button type="button">Inscription</Button>
                </Link>
              </div>
            </Col>
            <Col xs={12} md={6}>
              <Image
                alt="pancarte animal perdu"
                src={affiche}
                title="Image par Monica Rodriguez de Pixabay"
                thumbnail
              />
            </Col>
          </Row>
        </Container>
      </>
    );
  }

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (isOwner && postId) {
    if (user?.id !== post?.UserId) {
      return <Navigate to="/*" replace />;
    }
  }

  if (isCurrentUser && userLogin) {
    if (user?.id !== userProfile?.id) {
      return <Navigate to="/*" replace />;
    }
  }

  return children;
};

export default PrivateRoute;
