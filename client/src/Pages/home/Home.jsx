import "./home.scss";
import Navbar from "../../Components/NavBar/Navbar.jsx";
import Footer from "../../Components/Footer/Footer.jsx";
import React from "react";
import { Image, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw } from "@fortawesome/free-solid-svg-icons";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import { faLocationDot } from "@fortawesome/free-solid-svg-icons";
import { faBullhorn } from "@fortawesome/free-solid-svg-icons";
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
            <Col className={`my-5 d-flex justify-content-center justify-content-md-${window.innerWidth >= 768 ? 'center' : 'start'} text-center text-md-start`}>
              <div className="card border border-0">
                <h2 className="card-header display-6 pb-5 border border-0 text-center">
                  Pattes perdues
                </h2>
                <div className="card-body ms-auto text-center intro d-flex justify-content-center align-items-center">
                  <p className="card-text fw-bold">
                    facilite votre démarche pour vous aider à retrouver vos
                    animaux grâces à notre communauté !
                  </p>
                </div>
              </div>
            </Col>
          </Row>
          <Row className="align-items-center">
            <Col md={8} className="mx-1 mx-md-5">
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
            <Col md={3} className="text-center mt-5">
              <Image
                alt="chien type labrador"
                src={chien}
                className="introImg"
                thumbnail
              />
            </Col>
          </Row>
          <Row className="postCard row-cols-2 mt-5">
            <Col md={6} className="mb-5 seePost d-flex align-items-center mx-auto">
              <FontAwesomeIcon icon={faEye} />
              <Link to="/posts">
                <Button>Voir les annonces</Button>
              </Link>
            </Col>
            <Col md={6} className="mb-5 publishPost d-flex align-items-center mx-auto">
              <FontAwesomeIcon icon={faBullhorn} />
              <Link to="/publish">
                <Button>Publier une annonce</Button>
              </Link>
            </Col>
          </Row>
        </Container>
      </main>

      <Footer />
    </div>
  );
};

export default Home;
