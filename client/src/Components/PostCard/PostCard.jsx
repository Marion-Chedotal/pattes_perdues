import "./PostCard.scss";
import React from "react";
import { Card } from "react-bootstrap";
import formatDate from "../../Utils/formatDate";
import Button from "../../Components/Btn/Button";

import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faVenusMars,
  faLocationDot,
  faCalendar,
  faIdCard,
} from "@fortawesome/free-solid-svg-icons";

const PostCard = ({ post }) => {
  const postDate = formatDate(post.alert_date);

  return (
    <div>
      <Card style={{ width: "18rem" }} className="bold-text">
        <Card.Body className="d-flex flex-column align-items-center">
          <div className="d-flex justify-content-evenly w-100 mb-2">
            <Card.Title>{post.Type.label.toUpperCase()}</Card.Title>
            <Card.Title className="ms-2">
              {post.Pet_category.label.toUpperCase()}
            </Card.Title>
          </div>
          <div className="d-flex align-items-baseline">
            <FontAwesomeIcon icon={faIdCard} className="me-2" />
            <Card.Title className="mb-0 ms-2">{post.name}</Card.Title>
          </div>
          <Card.Img variant="top" src={post.image} className="my-3" />
          <div className="d-flex justify-content-evenly w-100">
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faCalendar} />
              <p className="mb-0 ms-2">{postDate}</p>
            </div>
            <div className="d-flex align-items-center">
              <FontAwesomeIcon icon={faVenusMars} />
              <p className="mb-0 ms-2">{post.gender}</p>
            </div>
          </div>
          <div className="d-flex align-items-baseline mt-3">
            <FontAwesomeIcon icon={faLocationDot} />
            <p className="mb-0 ms-2">{post.Address.city}</p>
          </div>
          <Link to="/annonce" className="my-4">
            <Button type="button">Détails</Button>
          </Link>
        </Card.Body>
      </Card>
    </div>
  );
};

export default PostCard;
