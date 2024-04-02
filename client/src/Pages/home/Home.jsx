import "./home.scss";
import Navbar from "../../Components/NavBar/Navbar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import React from "react";
import { Image, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPaw,
  faEye,
  faLocationDot,
  faBullhorn,
} from "@fortawesome/free-solid-svg-icons";
import chien from "../../Components/Assets/chien_home.jpg";
import Button from "../../Components/Btn/Button.jsx";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Navbar />
      <main>
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
            <Col md={8} className="">
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
                <div className="d-flex align-items-center py-4">
                  <FontAwesomeIcon icon={faEye} />
                  <dt className="ps-3"> Une annonce près de chez vous ? </dt>
                </div>
                <ol>
                  <li>
                    Informer le propriétaire que vous aller effectuer des
                    recherches en cliquant sur cette icône !
                  </li>
                </ol>
              </dl>
            </Col>
            <Col md={3} className="text-center mt-5 d-none d-md-block">
              <Image
                alt="chien type labrador"
                src={chien}
                className="introImg"
                thumbnail
              />
            </Col>
          </Row>
          <Row className="postCard row-cols-2 mt-5">
            <Col md={6}>
              <div className="mb-5 seePost mx-auto text-center">
                <Link to="/posts">
                  <Button>
                    <FontAwesomeIcon icon={faEye} className="me-1" />
                    Voir les annonces
                  </Button>
                </Link>
              </div>
            </Col>
            <Col md={6}>
              <div className="mb-5 publishPost mx-auto text-center">
                <Link to="/publish">
                  <Button>
                    <FontAwesomeIcon icon={faBullhorn} className="me-3" />
                    Publier une annonce
                  </Button>
                </Link>
              </div>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
