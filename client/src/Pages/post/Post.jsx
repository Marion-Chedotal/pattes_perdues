import React, { useEffect, useState } from "react";
import "./post.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import affiche from "../../assets/affiche_animal_perdu.jpg";
import postService from "../../services/postService";
import { Link, useNavigate, useParams } from "react-router-dom";
import Button from "../../components/btn/Button";
import SuccessMessage from "../../components/successMessage/SuccessMessage";
import conversationService from "../../services/conversationService";
import { Tooltip } from "react-tooltip";
import {
  formatDate,
  capitalizeFirstLetter,
  decodeHtml,
} from "../../utils/format";
import { Image, Container, Row, Col, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
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
  faMessage,
  faPaperPlane,
  faPaw,
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

  const [post, setPost] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showContactModal, setShowContactModal] = useState(false);
  const [error, setError] = useState(null);
  const [content, setContent] = useState("");
  const [isContentModified, setIsContentModified] = useState(false);

  const { user, token } = useSelector((state) => state.auth);
  const currentUserId = user?.id;
  const receiverId = post?.User?.id;

  const { t } = useTranslation();

  //modal management
  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setError(null);
  };

  const handleShowDeleteModal = () => setShowDeleteModal(true);

  const handleCloseContactModal = () => {
    setShowContactModal(false);
    setError(null);
  };

  const handleShowContactModal = () => {
    // we can contact owner only if you're connected and if you're not the owner
    if (user && !isPostOwner) {
      setShowContactModal(true);
      return;
    }
  };
  const isPostOwner = postService.isPostOwner(user?.id, post?.User?.id);

  const postDate = post ? formatDate(post.alert_date) : "";
  const name = post ? capitalizeFirstLetter(post.name) : "";

  const navigate = useNavigate();

  // TODO:sécuriser cette url pour la transmission
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

  // isOwnerPost: he can delete it
  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await postService.deletePost(id, token);
      navigate("/annonces", {
        state: {
          successMessage: "Votre annonce a été supprimée avec succès !",
        },
      });
    } catch (err) {
      setError("La suppression de l'annonce a échoué. Veuillez réessayer.");
    }
  };

  function handleContentChange(e) {
    setContent({
      content: e.target.value,
    });
    setIsContentModified(true);
  }

  const handleContact = async (e) => {
    e.preventDefault();
    try {
      await conversationService.start(
        receiverId,
        {
          ...content,
          senderId: currentUserId,
          receiverId,
          PostId: id,
        },
        token
      );
      navigate(`/profil/${user?.login}`, {
        state: {
          successMessage:
            "Votre message a bien été envoyé. Vous pouvez retrouver la conversation dans votre messagerie",
        },
      });
    } catch (err) {
      let errorMessage;

      if (err?.errorCode) {
        errorMessage = t(`conversation.${err.errorCode}`);
      }

      if (!errorMessage) {
        errorMessage =
          "Une erreur s'est produite. Veuillez réessayer plus tard.";
      }
      setError(errorMessage);
    }
  };
  return (
    <div className="onePost">
      <Header />
      <SuccessMessage />
      <Container className="my-5">
        <Row className="align-items-center">
          <div className="mb-5 text-center">
            <h4>Annonce de {post?.User?.login}</h4>
          </div>
          {post?.is_active === false && (
            <div>
              <h4 className="text-center founded py-3 mb-5">
                A Retrouvé son propriétaire!
              </h4>
            </div>
          )}
          {isPostOwner && (
            <div className="mb-4 d-flex justify-content-center isOwnerAction">
              <Link
                to={`/modification-annonce/${id}`}
                aria_label="renvoyer vers la modification de l'annonce"
              >
                <button type="button" aria_label="modifier l'annonce">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    className="iconAction"
                  />
                </button>
              </Link>
              <button
                type="button"
                onClick={handleShowDeleteModal}
                aria_label="supprimer l'annonce"
              >
                <FontAwesomeIcon icon={faTrash} className="iconAction" />
              </button>
              <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header closeButton>
                  <div>
                    <p>Êtes-vous sûr de vouloir supprimer cette annonce ?</p>
                    {error && <div className="alert alert-danger">{error}</div>}
                  </div>
                </Modal.Header>
                <Modal.Footer>
                  <button
                    type="button"
                    className="p-2 text-black border border-0 rounded"
                    onClick={handleDelete}
                    aria_label="supprimer l'annonce"
                  >
                    Oui
                  </button>
                  <button
                    type="button"
                    className="p-2 text-black border border border-0 rounded"
                    onClick={handleCloseDeleteModal}
                    aria_label="fermer la modal"
                  >
                    Non
                  </button>
                </Modal.Footer>
              </Modal>
            </div>
          )}
          {post?.picture ? (
            <Col md={6} className="text-center">
              <Image
                src={`${process.env.REACT_APP_HOST}/${post?.picture}`}
                alt="photo de l'animal"
                style={{ maxWidth: "100%", maxHeight: "500px" }}
              />
            </Col>
          ) : (
            <Col md={6} className="text-center">
              <Image
                src={affiche}
                alt="pancarte animal perdu"
                title="Image par Monica Rodriguez de Pixabay"
                style={{ maxWidth: "100%", maxHeight: "400px" }}
              />
            </Col>
          )}
          <Col md={6}>
            <div className="postInformations">
              <div className="d-flex justify-content-around my-3">
                {" "}
                <h6 className="tag">{post?.Type?.label}</h6>
                <h6 className="tag">{post?.Pet_category?.label}</h6>
              </div>

              <Row className="mt-4">
                <Col>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon icon={faVenusMars} className="me-4 icon" />
                    <div>
                      <h6 className="mb-0">Genre</h6>
                      <span>{post?.gender}</span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon icon={faIdCard} className="me-4 icon" />
                    <div>
                      <h6 className="mb-0">Nom</h6>
                      <span>{decodeHtml(name)}</span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon icon={faMarker} className="me-4 icon" />
                    <div>
                      <h6 className="mb-0">Tatouage</h6>
                      <span>
                        {post?.tattoo === "Ne sais pas" ? "?" : post?.tattoo}
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>

              <Row className="mb-5">
                <Col>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon icon={faCalendar} className="me-4 icon" />
                    <div>
                      <h6 className="mb-0">Date</h6>
                      <span className="date">{postDate}</span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon icon={faMicrochip} className="me-4 icon" />
                    <div>
                      <h6 className="mb-0">Puce</h6>
                      <span>
                        {post?.microchip === "Ne sais pas"
                          ? "?"
                          : post?.microchip}
                      </span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon icon={faRing} className="me-4 icon" />
                    <div>
                      <h6 className="mb-0">Collier</h6>
                      <span>
                        {post?.collar === "Ne sais pas" ? "?" : post?.collar}
                      </span>
                    </div>
                  </div>
                </Col>
              </Row>
              <div className="details">
                <h5>Description: </h5>
                <p>{decodeHtml(post?.description)}</p>
                <h5>Signes distinctifs: </h5>
                <p>{decodeHtml(post?.distinctive_signs)}</p>
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
                    <p className="m-0">{decodeHtml(post?.street)}</p>
                    <div className="d-flex align-items-center">
                      <p className="m-0 me-2">{post?.postalCode}</p>
                      <p className="m-0 city">{decodeHtml(post?.city)}</p>
                    </div>
                  </div>
                </div>
              </Col>
              <Col xs={6}>
                <div className="d-flex mt-4 justify-content-center align-items-center">
                  <FontAwesomeIcon icon={faUser} className="me-3 icon" />
                  <p className="pt-3">{post?.User?.login}</p>
                </div>
              </Col>
            </Row>
          </Col>
          <Col
            md={6}
            className="mt-5 mt-lg-0"
            data-tip
            data-tooltip-id="tooltip-contact"
            data-tooltip-content="Vous devez être connecté pour contacter le propriétaire"
          >
            {post?.is_active === true && (
              <div>
                <h4 className="mb-4">Envie d'aider ?</h4>
                <Button
                  type="button"
                  onClick={handleShowContactModal}
                  disabled={!user}
                  aria_label="envoyer un message"
                >
                  <FontAwesomeIcon icon={faMessage} className="iconAction" />
                  &nbsp;Contacter {post?.User?.login}
                  {!user && (
                    <Tooltip id="tooltip-contact" effect="solid"></Tooltip>
                  )}
                </Button>
                <div className="d-flex justify-content-center gap-2 mt-4 align-items-center mt-5">
                  <h6>Partager l'annonce:</h6>
                  <EmailShareButton
                    url={shareUrl}
                    aria_label="partager par mail"
                  >
                    <EmailIcon size={32} round={true} />
                  </EmailShareButton>
                  <FacebookMessengerShareButton
                    url={shareUrl}
                    aria_label="partager sur messenger"
                  >
                    <FacebookMessengerIcon size={32} round={true} />
                  </FacebookMessengerShareButton>
                  <FacebookShareButton
                    url={shareUrl}
                    aria_label="partager sur facebook"
                  >
                    <FacebookIcon size={32} round={true} />
                  </FacebookShareButton>
                  <WhatsappShareButton
                    url={shareUrl}
                    aria_label="partager sur whatsapp"
                  >
                    <WhatsappIcon size={32} round={true} />
                  </WhatsappShareButton>
                </div>
              </div>
            )}
            <Modal show={showContactModal} onHide={handleCloseContactModal}>
              <Modal.Header
                closeButton
                className="border border-0 text-secondary"
              >
                <div>
                  <h4 className="mt-2 text-center lh-base">
                    Contacter <em>{post?.User?.login} </em>
                    pour l'annonce de <FontAwesomeIcon icon={faPaw} />
                    <em> {decodeHtml(name)}</em>
                  </h4>
                  {error && (
                    <div className="alert alert-danger mt-4 text-center">
                      {error}
                    </div>
                  )}
                </div>
              </Modal.Header>
              <Modal.Body>
                <form
                  className="d-flex flex-column"
                  onSubmit={handleContact}
                  method="POST"
                  encType="multipart/form-data"
                >
                  <textarea
                    className="form-control mb-4"
                    aria-label="With textarea"
                    placeholder="Message"
                    name="content"
                    rows="10"
                    onChange={handleContentChange}
                  ></textarea>
                  <Button
                    type="submit"
                    disabled={!isContentModified}
                    aria_label="envoyer le message"
                  >
                    Envoyer
                    <FontAwesomeIcon
                      icon={faPaperPlane}
                      className={
                        !isContentModified ? "ps-2 text-muted" : "ps-2"
                      }
                    />
                  </Button>
                </form>
              </Modal.Body>
            </Modal>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Post;
