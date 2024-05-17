import "./footer.scss";
import logo from "../../assets/pattes_perdues_logo.png";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaw, faCircleUp } from "@fortawesome/free-solid-svg-icons";

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <Navbar expand="lg" className="footer justify-content-around mt-5">
      <Container>
        <Navbar.Brand as={Link} to="/" className="">
          <img src={logo} alt="logo pattes perdues" />
        </Navbar.Brand>
        <Nav className="d-flex flex-column">
          <Nav.Link as={Link} to="/legals" className="ps-4">
            Mentions Légales
          </Nav.Link>
          <div className="d-flex flex-column align-items-center">
            <span className="pe-5">
              Fait avec <FontAwesomeIcon icon={faPaw} /> et Mache @2024
            </span>
          </div>
        </Nav>
        <Navbar.Brand onClick={scrollToTop}>
          <FontAwesomeIcon icon={faCircleUp} />
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Footer;
