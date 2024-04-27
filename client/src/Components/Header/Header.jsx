import "./Header.scss";
import React from "react";
import { Link } from "react-router-dom";
import Button from "../Btn/Button";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../../Assets/pattes_perdues_logo.png";
import Logout from "../LogoutBtn/LogoutBtn";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  return (
    <Navbar expand="lg">
      <Container>
        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          className="custom-toggler"
        />
        <Navbar.Brand href="/" className="order-lg-1 mx-auto">
          <img src={logo} alt="logo pattes perdues" />
        </Navbar.Brand>
        <Nav className="order-lg-3 mx-auto d-flex align-items-center">
          {isAuthenticated && user ? (
            <>
              <Link to={`/profil/${user?.login}`} className="goToProfil">
                <div
                  className="flex items-center gap-2"
                  data-tip
                  data-tooltip-id="tooltip-profil"
                  data-tooltip-content="Voir mon profil"
                >
                  {/* TODO: Ajout un avatar par défaut */}
                  {/* <img
                    className="h-8 w-8 rounded-full"
                    src={user?.avatar}
                    alt="avatar"
                  /> */}
                  <span className="me-lg-3 mb-3 mb-lg-0">{user?.login}</span>
                  <Tooltip id="tooltip-profil" effect="solid"></Tooltip>
                </div>
              </Link>
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
          className="order-lg-2 justify-content-center"
        >
          <Nav className="fw-bold">
            <Nav.Link href="/annonces">Voir les annonces</Nav.Link>
            <Nav.Link href="/deposer-une-annonce">Créer une annonce</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
