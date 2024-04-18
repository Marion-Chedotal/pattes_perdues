import "./Footer.scss";
import logo from "../Assets/pattes_perdues_logo.png";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faCircleUp } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  return (
<Navbar expand="lg" className="footer justify-content-around">
  <Container>
    <Navbar.Brand as={Link} to="/home" className="">
      <img src={logo} alt="logo pattes perdues"/>
    </Navbar.Brand>
    <Nav className="d-flex flex-column">
      <Nav.Link as={Link} to="/home" className="ps-4">
        Mentions Légales
      </Nav.Link>
      <div className="d-flex flex-column align-items-center">
        <span className="pe-5">
          Fait avec <FontAwesomeIcon icon={faPaw} /> et Mache @2024{" "}
        </span>
      </div>
    </Nav>
    <Navbar.Brand as={Link} to="/accueil">
      <FontAwesomeIcon icon={faCircleUp} />
    </Navbar.Brand>
  </Container>
</Navbar>
  );
};

export default Footer;
