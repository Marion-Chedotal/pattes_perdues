import React, { useEffect, useState } from "react";
import "./Conversation.scss";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import Button from "../../Components/Btn/Button";

import UserConversations from "../../Components/UserConversations/UserConversations";
import ConversationCard from "../../Components/ConversationCard/ConversationCard";
import conversationService from "../../Services/ConversationService";

import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDate, capitalizeFirstLetter } from "../../Utils/format";
import { Image, Container, Row, Col, Modal } from "react-bootstrap";
import { useSelector } from "react-redux";
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
  faConversation,
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

const Conversation = () => {
  const [activeSection, setActiveSection] = useState("profil");
  const [error, setError] = useState(null);
  
  const handleShowUserConversations = () => {
    setActiveSection("mes-conversations");
  };

  return (
    <div>
      <Header/>
      {activeSection === "profil" && <ConversationCard showUserConversations={handleShowUserConversations} />}
      {activeSection === "mes-conversations" && <UserConversations />}
      <Footer/>
    </div>
  );
};

export default Conversation;
