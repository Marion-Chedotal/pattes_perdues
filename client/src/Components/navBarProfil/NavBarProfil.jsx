import React, { useState } from "react";
import "./NavBarProfil.scss";
import Button from "../Btn/Button";
import { Modal } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import userService from "../../Services/UserService";
import { useSelector, useDispatch} from "react-redux";
import { logout } from "../../store/authActions";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faSliders,
  faEnvelope,
  faTrash,
  faNewspaper,
} from "@fortawesome/free-solid-svg-icons";
import { Container, Row, Col } from "react-bootstrap";

const NavBarProfil = () => {
  const { login } = useParams();
  const { token } = useSelector((state) => state.auth);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  //modal management
  const handleClose = () => {
    setShowModal(false);
    setError(null);
  };

  const handleShow = () => setShowModal(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await userService.deleteUser(login, token);
      dispatch(logout());
      navigate("/", {
        state: {
          deleteSuccessMessage: "Votre compte a été supprimé avec succès !",
        },
      });
    } catch (err) {
      setError("La suppression du compte a échoué. Veuillez réessayer.");
    }
  };
  return (
    <div>
      <Container fluid className="navProfil my-5">
        <Row xs={6} className="py-3 justify-content-center">
          <Col className="text-center">
            <Button type="button" className="d-flex flex-column ">
              <FontAwesomeIcon
                icon={faAddressCard}
                className="icons fluid-icon"
              />
              <span className="d-none d-md-block">Profil</span>
            </Button>
          </Col>
          <Col className="text-center ">
            <Button type="button" className="d-flex flex-column">
              <FontAwesomeIcon icon={faSliders} className="icons" />
              <span className="d-none d-md-block">Modifier mon profil</span>
            </Button>
          </Col>
          <Col className="text-center ">
            <Button type="button" className="d-flex flex-column">
              <FontAwesomeIcon icon={faEnvelope} className="icons" />
              <span className="d-none d-md-block">Messagerie</span>
            </Button>
          </Col>
          <Col className="text-center ">
            <Button type="button" className="d-flex flex-column">
              <FontAwesomeIcon icon={faNewspaper} className="icons" />
              <span className="d-none d-md-block">Mes annonces</span>
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
    </div>
  );
};

export default NavBarProfil;
