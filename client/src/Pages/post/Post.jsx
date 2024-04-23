import React, { useContext, useEffect, useState } from "react";
import "./Post.scss";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import affiche from "../../Assets/affiche_animal_perdu.jpg";
import { AuthContext } from "../../Context/AuthContext";
import postService from "../../Services/PostService";
import { useNavigate } from "react-router-dom";
import Button from "../../Components/Btn/Button";
import { formatDate, capitalizeFirstLetter } from "../../Utils/format";
import { useParams } from "react-router-dom";
import { Image, Container, Row, Col } from "react-bootstrap";
import Modal from "react-bootstrap/Modal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVenusMars,
  faLocationDot,
  faCalendar,
  faIdCard,
  faUser,
  faMarker,
  faRing,
  faMicrochip,
  faTrash,
  faPenToSquare,
} from "@fortawesome/free-solid-svg-icons";

import {
  EmailShareButton,
  EmailIcon,
  FacebookShareButton,
  FacebookMessengerShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share";

const Post = () => {
  const { id } = useParams();
  const { currentUser } = useContext(AuthContext);
  const [post, setPost] = useState(null);
  const [show, setShow] = useState(false);
  const [deleteMessage, setDeleteMessage] = useState("");
  const [error, setError] = useState(null);

  //modal management
  const handleClose = () => {
    setShow(false);
    setError(null);
  };

  const handleShow = () => setShow(true);

  const isPostOwner = postService.isPostOwner(currentUser?.id, post?.User?.id);

  const postDate = post ? formatDate(post.alert_date) : "";
  const name = post ? capitalizeFirstLetter(post.name) : "";

  const navigate = useNavigate();

  const shareUrl = window.location.href;

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const post = await postService.getOne(id);
        setPost(post);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [id]);

  // isOwnerPost: it can delete it
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await postService.deletePost(id, currentUser.accessToken);
      navigate("/annonces", {
        state: {
          deleteSuccessMessage: "Votre annonce a été supprimée avec succès !",
        },
      });
    } catch (err) {
      setError("La suppression de l'annonce a échoué. Veuillez réessayer.");
    }
  };
  return (
    <div>
      <Header />
      <Container className="my-5 onePost">
        <Row className="text-center align-items-center">
          {" "}
          <div className="mb-5">
            <h4>Annonce de {post?.User?.login}</h4>
          </div>
          {isPostOwner && (
            <div className="mb-4 d-flex justify-content-center isOwnerAction">
              <button>
                <FontAwesomeIcon icon={faPenToSquare} className="iconAction" />
              </button>
              <button onClick={handleShow}>
                <FontAwesomeIcon icon={faTrash} className="me-5 iconAction" />
              </button>
              <Modal show={show} onHide={handleClose} className="modalDelete">
                <Modal.Header closeButton>
                  <div>
                    <p>Êtes-vous sûr de vouloir supprimer cette annonce ?</p>
                    {error && <div className="alert alert-danger">{error}</div>}
                  </div>
                </Modal.Header>
                <Modal.Footer className="hello">
                  <button className="p-2 text-black border border-0 rounded"
                    onClick={handleDelete}
                  >
                    Oui
                  </button>
                  <button className="p-2 text-black border border border-0 rounded" onClick={handleClose}>Non</button>
                </Modal.Footer>
              </Modal>
            </div>
          )}
          {post?.picture ? (
            <Col md={6}>
              <Image
                src={"http://localhost:3001/" + post?.picture}
                style={{ maxWidth: "100%", maxHeight: "500px" }}
              />
            </Col>
          ) : (
            <Col md={6}>
              <Image
                src={affiche}
                style={{ maxWidth: "100%", maxHeight: "400px" }}
              />
            </Col>
          )}
          <Col md={6}>
            <div>
              <div className="d-flex justify-content-around my-3">
                {" "}
                <h6 className="tag">{post?.Type?.label}</h6>
                <h6 className="tag">{post?.Pet_category?.label}</h6>
              </div>

              <Row className="mt-4">
                <Col>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon icon={faVenusMars} className="me-3 icon" />
                    <div>
                      <h6 className="mb-0 align">Genre</h6>
                      <span>{post?.gender}</span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon icon={faIdCard} className="me-3 icon" />
                    <div>
                      <h6 className="mb-0">Nom</h6>
                      <span>{name}</span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon icon={faMarker} className="me-3 icon" />
                    <div>
                      <h6 className="mb-0">Tatouage</h6>
                      <span>{post?.tattoo ? "Oui" : "Non"}</span>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row className="mb-5">
                <Col>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon icon={faCalendar} className="me-2 icon" />
                    <div>
                      <h6 className="mb-0">Date</h6>
                      <span>{postDate}</span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon icon={faMicrochip} className="me-4 icon" />
                    <div>
                      <h6 className="mb-0">Puce</h6>
                      <span>{post?.microchip ? "Oui" : "Non"}</span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon icon={faRing} className="me-4 icon" />
                    <div>
                      <h6 className="mb-0">Collier</h6>
                      <span>{post?.collar ? "Oui" : "Non"}</span>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="details">
                <h5>Description: </h5>
                <p>{post?.description}</p>
                <h5>Signes distinctifs: </h5>
                <p>{post?.distinctive_signs}</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row className="mt-5 d-flex text-center">
          <hr className="hr border-5 mb-5 flex-shrink-1 mx-5" />
          <Col md={6}>
            <h4>Localisation et contact</h4>
            <Row className="align-items-center">
              <Col xs={6}>
                <div className="d-flex justify-content-center align-items-center mt-4 ">
                  <FontAwesomeIcon icon={faLocationDot} className="me-3 icon" />
                  <div>
                    <p className="m-0">{post?.Address?.street}</p>
                    <div className="d-flex align-items-center">
                      <p className="m-0 me-2">{post?.Address?.postalCode}</p>
                      <p className="m-0 city">{post?.Address?.city}</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={6}>
                <div className="d-flex mt-4 justify-content-center">
                  <FontAwesomeIcon icon={faUser} className="me-3 icon" />
                  <p className="pt-1">{post?.User?.login}</p>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={6} className="mt-5 mt-lg-0">
            <h4 className="mb-4">Envie d'aider ?</h4>
            <Button class>Contacter {post?.User?.login}</Button>
            <div className="d-flex justify-content-center gap-2 mt-4 align-items-center mt-5">
              <h6>Partager l'annonce:</h6>
              <EmailShareButton url={shareUrl}>
                <EmailIcon size={32} round={true} />
              </EmailShareButton>
              <FacebookMessengerShareButton url={shareUrl}>
                <FacebookMessengerIcon size={32} round={true} />
              </FacebookMessengerShareButton>
              <FacebookShareButton url={shareUrl}>
                <FacebookIcon size={32} round={true} />
              </FacebookShareButton>
              <WhatsappShareButton url={shareUrl}>
                <WhatsappIcon size={32} round={true} />
              </WhatsappShareButton>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Post;