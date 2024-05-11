import "./Header.scss";
import React, { useEffect, useState } from "react";
import userService from "../../Services/UserService";
import { Link } from "react-router-dom";
import Button from "../Btn/Button";
import { Navbar, Container, Nav } from "react-bootstrap";
import logo from "../../Assets/pattes_perdues_logo.png";
import Logout from "../LogoutBtn/LogoutBtn";
import { useSelector } from "react-redux";
import { Tooltip } from "react-tooltip";
import defaultAvatar from "../../Assets/default_avatar.png";

const Header = () => {
  const { isAuthenticated, user, token } = useSelector((state) => state.auth);
  const currentUserId = user?.id;
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      const fetchUserData = async () => {
        try {
          // fetch global user information
          const data = await userService.getUserInformation(
            currentUserId,
            token
          );
          setUserData(data);
        } catch (err) {
          console.error("Error fetching posts:", err);
        }
      };
      fetchUserData();
    }
  }, [isAuthenticated, currentUserId, token]);

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
        <Nav className="order-lg-3 mx-auto d-flex align-items-center gap-2">
          {isAuthenticated && user ? (
            <>
              <Link to={`/profil/${user?.login}`} className="goToProfil">
                <div
                  className="d-flex flex-lg-column justify-content-center align-items-center gap-1"
                  data-tip
                  data-tooltip-id="tooltip-profil"
                  data-tooltip-content="Voir mon profil"
                >
                  <img
                    className="h-8 w-8 avatar rounded-circle"
                    src={
                      userData?.avatar
                        ? `http://localhost:${REACT_APP_PORT}/` + userData.avatar
                        : defaultAvatar
                    }
                    alt="user avatar"
                    title="defaultAvatar:Photo by FOX on Pexels"
                  />
                  <div className="d-flex flex-lg-column align-items-center">
                    <span>{user?.login}</span>
                    <Tooltip id="tooltip-profil" effect="solid"></Tooltip>
                  </div>
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
