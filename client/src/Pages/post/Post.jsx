import React, { useContext, useEffect, useState } from "react";
import "./Post.scss";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { AuthContext } from "../../Context/AuthContext";
import postService from "../../Services/PostService";
import { Link } from "react-router-dom";
import Button from "../../Components/Btn/Button";
import { useParams } from "react-router-dom";
import { Image, Container, Row, Col } from "react-bootstrap";
import { formatDate, capitalizeFirstLetter } from "../../Utils/format";
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

  const postDate = formatDate(post?.alert_date);
  const name = capitalizeFirstLetter(post?.name);

  const shareUrl = window.location.href;

  useEffect(() => {
    const fetchPostDetails = async () => {
      try {
        const post = await postService.getOne(id);
        console.log(post);
        setPost(post);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPostDetails();
  }, [id]);

  return (
    <div>
      <Header />
      <Container className="my-5 onePost">
        <Row className="text-center align-items-center">
          {" "}
          <div className="mb-5">
            <h4>Annonce de {post?.User?.login}</h4>
          </div>
          <Col md={6}>
            <Image
              src={"http://localhost:3001/" + post?.picture}
              style={{ maxWidth: "100%", maxHeight: "500px" }}
            />
          </Col>
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
                    <FontAwesomeIcon
                      icon={faVenusMars}
                      className="me-2 icone"
                    />
                    <div>
                      <h6 className="mb-0 align">Genre</h6>
                      <span>{post?.gender}</span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon icon={faIdCard} className="me-2 icone" />
                    <div>
                      <h6 className="mb-0">Nom</h6>
                      <span>{name}</span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon icon={faMarker} className="me-2 icone" />
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
                    <FontAwesomeIcon icon={faCalendar} className="me-2 icone" />
                    <div>
                      <h6 className="mb-0">Date</h6>
                      <span>{postDate}</span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon
                      icon={faMicrochip}
                      className="me-2 icone"
                    />
                    <div>
                      <h6 className="mb-0">Puce</h6>
                      <span>{post?.microchip ? "Oui" : "Non"}</span>
                    </div>
                  </div>
                </Col>
                <Col>
                  <div className="d-flex align-items-center mb-3">
                    <FontAwesomeIcon icon={faRing} className="me-2 icone" />
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
        <Row className="">
          <Col md={6}>
            <h6>Localisation et contact</h6>
            <Col md={6}>
              <div className="d-flex align-items-center mb-3">
                <FontAwesomeIcon icon={faLocationDot} className="me-2 icone" />
                <div>
                  <h6>Adresse</h6>
                  <p>{post?.Address?.street}</p>
                  <p>
                    {post?.Address?.postalCode} {post?.Address?.city}
                  </p>
                </div>
              </div>
            </Col>

            <FontAwesomeIcon icon={faUser} className="me-2 icone" />
            <p>{post?.User?.login}</p>
          </Col>
          <Col>
            <h4>Envie d'aider ?</h4>
            <Button>Contacter {post?.User?.login}</Button>

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
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
};

export default Post;
