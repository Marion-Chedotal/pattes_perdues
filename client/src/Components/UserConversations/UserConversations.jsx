import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./UserConversations.scss";
import ConversationService from "../../Services/ConversationService";
import ConversationCard from "../ConversationCard/ConversationCard";
import messageService from "../../Services/MessageService";
import { formatDate } from "../../Utils/format";
import defaultAvatar from "../../Assets/default_avatar.png";
import Button from "../Btn/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const UserConversations = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { login } = useParams();

  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);
  const [hasUnreadMessages, setHasUnreadMessages] = useState(false);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchUserConversations = async () => {
      try {
        const userConversations =
          await ConversationService.getUserConversations(login, token);
        setConversations(userConversations);
        if (userConversations.length === 0) return setNoResults(true);
        setNoResults(false);

        // check for unread messages
        const hasUnreadMessages = await messageService.userUnreadMessages(
          user.id,
          token
        );

        setHasUnreadMessages(hasUnreadMessages);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    fetchUserConversations();
  }, [login, token, user.id]);

  const switchConversation = async (conversationId) => {
    try {
      if (!isNaN(conversationId)) {
        setActiveConversationId(conversationId);
        const conversation = await ConversationService.getOne(
          login,
          conversationId,
          token
        );

        setActiveConversation(conversation);
      }
    } catch (err) {
      console.error("Failed switchConversation().", err);
    }
  };

  // know if currentUser is receiver or sender
  const currentUserId = user.id;
  const firstSender = activeConversation?.Messages[0].UserId;
  const firstReceiver = activeConversation?.Messages[0].Receiver.id;
  let myInterlocutor;

  if (currentUserId === firstSender) {
    myInterlocutor = activeConversation?.Messages[0].Receiver;
  }

  if (currentUserId === firstReceiver) {
    myInterlocutor = activeConversation?.Messages[0].Sender;
  }

  return (
    <div className="container">
      <div className="row">
        <div className="mx-auto messagerie">
          {activeConversation ? (
            <div className="text-center activeConversation">
              <Button
                onClick={() => setActiveConversation(null)}
                className="ici"
              >
                <FontAwesomeIcon icon={faBackward} className="me-3" />
                Retour aux discussions
              </Button>
              <div className="d-flex justify-content-center align-items-center gap-2 mt-4">
                <img
                  src={
                    myInterlocutor?.avatar
                      ? `http://localhost:${process.env.REACT_APP_PORT}/` +
                        myInterlocutor?.avatar
                      : defaultAvatar
                  }
                  alt="Avatar"
                  className="avatar rounded-circle"
                />
                <h6>{myInterlocutor?.login}</h6>
              </div>
              <div>
                <h5 className="mt-2">
                  Annonce pour {activeConversation?.Post?.name}
                </h5>
                <Link to={`/annonce/${activeConversation.PostId}`}>
                  Voir l'annonce
                </Link>
              </div>
              <div className="mt-5">
                <div className="conversationCard py-5 px-5">
                  <ConversationCard
                    conversation={activeConversation}
                    setConversation={setActiveConversation}
                    myInterlocutor={myInterlocutor}
                  />
                </div>
              </div>
            </div>
          ) : (
            <>
              <h5 className="mb-5 text-center">Discussions</h5>
              <div className="list-group discussions">
                {noResults ? (
                  <p className="text-center fw-bold mt-2">
                    Vous n'avez pas encore de conversations.
                  </p>
                ) : (
                  conversations?.map((conversation) => (
                    <button
                      key={conversation?.ConversationId}
                      onClick={() =>
                        switchConversation(conversation?.ConversationId)
                      }
                      type="button"
                      className={
                        conversation?.ConversationId === activeConversationId
                          ? "list-group-item list-group-item-action active border border-0"
                          : "list-group-item list-group-item-action border border-0"
                      }
                    >
                      <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-start align-items-center gap-2 mb-2">
                          <img
                            src={
                              conversation?.myInterlocutor?.avatar
                                ? `http://localhost:${process.env.REACT_APP_PORT}/` +
                                  conversation?.myInterlocutor?.avatar
                                : defaultAvatar
                            }
                            alt="Avatar"
                            className="avatar rounded-circle"
                          />
                          <div>
                            <div className="d-flex align-items-center">
                              <h6>{conversation?.myInterlocutor}</h6>
                              {conversation.read === false &&
                                conversation.receiverId === user.id && (
                                  <span className="ps-2">
                                    <FontAwesomeIcon
                                      icon={faEnvelope}
                                      className="badge p-2"
                                    />
                                  </span>
                                )}
                            </div>

                            <span className="mb-3">
                              Annonce pour {conversation?.name}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end">
                          <span className="mb-3">
                            {formatDate(conversation?.messageUpdatedAt)}
                          </span>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserConversations;
