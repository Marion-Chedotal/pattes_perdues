import React, { useState } from "react";
import "./profil.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import Button from "../../components/btn/Button";
import UserPosts from "../../components/userPosts/UserPosts";
import UserConversations from "../../components/userConversations/UserConversations";
import ProfilCard from "../../components/profilCard/ProfilCard";
import UpdateProfil from "../../components/updateProfil/UpdateProfil";
import SuccessMessage from "../../components/successMessage/SuccessMessage";
import { useNavigate, useParams } from "react-router-dom";
import userService from "../../services/userService";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../store/authActions";
import { Modal, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faSliders,
  faEnvelope,
  faTrash,
  faNewspaper,
  faPaw,
} from "@fortawesome/free-solid-svg-icons";

const Profil = () => {
  const { login } = useParams();
  const { token, user } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [activeSection, setActiveSection] = useState("profil");
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleShowUserPosts = () => {
    setActiveSection("mes-annonces");
  };

  //Delete user: modal management + api call
  const handleClose = () => {
    setShowModal(false);
    setError(null);
  };

  const handleShow = () => setShowModal(true);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      if (user.login === login) {
        await userService.deleteUser(login, token);
        dispatch(logout());
        navigate("/", {
          state: {
            deleteSuccessMessage: "Votre compte a été supprimé avec succès !",
          },
        });
      }
    } catch (err) {
      setError("Une erreur est survenue lors de la suppression du compte.");
    }
  };

  return (
    <div>
      <Header />
      <SuccessMessage />
      <Container fluid className="navProfil my-5">
        <Row xs={6} className="py-3 justify-content-center">
          <Col className="text-center">
            <Button
              type="button"
              className="d-flex flex-column"
              onClick={() => setActiveSection("profil")}
            >
              <FontAwesomeIcon
                icon={faAddressCard}
                className="icons fluid-icon"
              />
              <span className="d-none d-md-block">Profil</span>
              {activeSection === "profil" && (
                <FontAwesomeIcon
                  icon={faPaw}
                  className="icons activeIcon mt-2"
                />
              )}
            </Button>
          </Col>
          <Col className="text-center ">
            <Button
              type="button"
              className="d-flex flex-column"
              onClick={() => setActiveSection("modification-profil")}
            >
              <FontAwesomeIcon icon={faSliders} className="icons" />
              <span className="d-none d-md-block">Modifier mon profil</span>
              {activeSection === "modification-profil" && (
                <FontAwesomeIcon
                  icon={faPaw}
                  className="icons activeIcon mt-2"
                />
              )}
            </Button>
          </Col>
          <Col className="text-center ">
            <Button
              type="button"
              className="d-flex flex-column"
              onClick={() => setActiveSection("messagerie")}
            >
              <FontAwesomeIcon icon={faEnvelope} className="icons" />
              <span className="d-none d-md-block">Messagerie</span>
              {activeSection === "messagerie" && (
                <FontAwesomeIcon
                  icon={faPaw}
                  className="icons activeIcon mt-2"
                />
              )}
            </Button>
          </Col>
          <Col className="text-center ">
            <Button
              type="button"
              onClick={() => setActiveSection("mes-annonces")}
              className="d-flex flex-column"
            >
              <FontAwesomeIcon icon={faNewspaper} className="icons" />
              <span className="d-none d-md-block">Mes annonces</span>
              {activeSection === "mes-annonces" && (
                <FontAwesomeIcon
                  icon={faPaw}
                  className="icons activeIcon mt-2"
                />
              )}
            </Button>
          </Col>
          <Col className="text-center ">
            <Button
              type="button"
              onClick={handleShow}
              className="d-flex flex-column"
            >
              <FontAwesomeIcon icon={faTrash} className="icons" />
              <span className="d-none d-md-block">Supprimer mon compte</span>
            </Button>
            <Modal show={showModal} onHide={handleClose}>
              <Modal.Header closeButton>
                <div>
                  <p>Êtes-vous sûr de vouloir supprimer votre compte ?</p>
                  {error && <div className="alert alert-danger">{error}</div>}
                </div>
              </Modal.Header>
              <Modal.Footer>
                <button
                  type="button"
                  className="p-2 text-black border border-0 rounded"
                  onClick={handleDelete}
                >
                  Oui
                </button>
                <button
                  type="button"
                  className="p-2 text-black border border border-0 rounded"
                  onClick={handleClose}
                >
                  Non
                </button>
              </Modal.Footer>
            </Modal>
          </Col>
        </Row>
      </Container>
      {activeSection === "profil" && (
        <ProfilCard showUserPosts={handleShowUserPosts} />
      )}
      {activeSection === "modification-profil" && (
        <UpdateProfil />
      )}
      {activeSection === "mes-annonces" && (
        <UserPosts />
      )}
      {activeSection === "messagerie" && (
        <UserConversations />
      )}
      <Footer />
    </div>
  );
};

export default Profil;
