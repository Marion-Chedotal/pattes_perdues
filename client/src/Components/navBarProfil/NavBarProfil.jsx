import React from "react";
import "./NavBarProfil.scss";
import Button from "../Btn/Button";

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
            <Button type="button" className="d-flex flex-column">
              <FontAwesomeIcon icon={faTrash} className="icons" />
              <span className="d-none d-md-block">Supprimer mon compte</span>
            </Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NavBarProfil;
