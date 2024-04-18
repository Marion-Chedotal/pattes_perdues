import "./Header.scss";
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import Button from "../Btn/Button";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../Assets/pattes_perdues_logo.png";
import Logout from "../LogoutBtn/LogoutBtn";
import { AuthContext } from "../../Context/AuthContext";

const Header = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="custom-toggler"
        />
        <Navbar.Brand href="#home" className="order-lg-1 mx-auto">
          <img src={logo} alt="logo pattes perdues" />
        </Navbar.Brand>
        <Nav className="order-lg-3 mx-auto">
          {currentUser ? (
            <>
              <span className="me-lg-3 mb-3 mb-lg-0">{currentUser.login}</span>
              <img
                src={currentUser.avatar}
                alt="User Avatar"
                className="avatar me-lg-3 mb-3 mb-lg-0"
              />
              <Logout />
            </>
          ) : (
            <>
              <Link to="/login" className="me-lg-3 mb-3 mb-lg-0">
                <Button type="button">Connexion</Button>
              </Link>
              <Link to="/register">
                <Button type="button">Inscription</Button>
              </Link>
            </>
          )}
        </Nav>

        <Navbar.Collapse
          id="basic-navbar-nav"
          className="justify-content-center order-lg-2"
        >
          <Nav className="fw-bold text-center">
            <Nav.Link href="annonces" className="me-5">
              Voir les annonces
            </Nav.Link>
            <Nav.Link href="deposer-une-annonce" className="me-5">
              Créer une annonce
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
