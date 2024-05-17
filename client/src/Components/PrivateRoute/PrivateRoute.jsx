import React from "react";
import "./privateRoute.scss";
import { Link } from "react-router-dom";
import Header from "../../components/header/Header";
import Button from "../btn/Button";
import { Image, Container, Row, Col } from "react-bootstrap";
import affiche from "../../assets/affiche_animal_perdu.jpg";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <div>
      {isAuthenticated && user ? (
        children
      ) : (
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
                    Connectez-vous ou créez un compte pour pouvoir accéder à l'ensemble des ressources!
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
                <Image alt="pancarte animal perdu" src={affiche} title="Image par Monica Rodriguez de Pixabay" thumbnail />
              </Col>
            </Row>
          </Container>
        </>
      )}
      
    </div>
  );
};

export default PrivateRoute;
