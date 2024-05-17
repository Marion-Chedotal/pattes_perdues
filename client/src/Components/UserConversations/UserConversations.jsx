import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./userConversations.scss";
import conversationService from "../../services/conversationService";
import ConversationCard from "../conversationCard/ConversationCard";
import messageService from "../../services/messageService";
import { formatDate } from "../../utils/format";
import defaultAvatar from "../../assets/default_avatar.png";
import Button from "../btn/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward, faEnvelope } from "@fortawesome/free-solid-svg-icons";

const UserConversations = () => {
  const { token, user } = useSelector((state) => state.auth);
  const { login } = useParams();
  const currentUserId = user.id;

  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchUserConversations = async () => {
      try {
        const userConversations =
          await conversationService.getUserConversations(login, token);
        setConversations(userConversations);
        if (userConversations.length === 0) return setNoResults(true);
        setNoResults(false);

        const conversationIds = userConversations.map(
          (conversation) => conversation.id
        );

        const lastMessages = await messageService.getLastMessage(
          conversationIds,
          token
        );

        // Map last messages to conversations
        const conversationsWithLastMessages = userConversations.map(
          (conversation) => {
            const lastMessage = lastMessages.find(
              (msg) => msg.ConversationId === conversation.id
            );
            return {
              ...conversation,
              lastMessage: lastMessage || null,
            };
          }
        );
        setConversations(conversationsWithLastMessages);

        // add avatarInterlocutor
        const avatarsInterlocutor = conversationsWithLastMessages.map(
          (conversation) => {
            if (currentUserId === conversation.receiverId) {
              return {
                ...conversation,
                myInterlocutorAvatar: conversation.userAvatar,
              };
            } else {
              return {
                ...conversation,
                myInterlocutorAvatar: conversation.receiverAvatar,
              };
            }
          }
        );
        setConversations(avatarsInterlocutor);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    fetchUserConversations();
  }, [login, token, currentUserId]);

  const switchConversation = async (conversationId) => {
    try {
      if (!isNaN(conversationId)) {
        setActiveConversationId(conversationId);
        const conversation = await conversationService.getOne(
          login,
          conversationId,
          token
        );

        setActiveConversation(conversation);

        const lastMessageId =
          conversation.Messages[conversation.Messages.length - 1].id;

        await messageService.markAsRead(lastMessageId, token);

        // Update the conversations state to reflect the read message
        setConversations((prevConversations) =>
          prevConversations.map((conv) =>
            conv.id === conversationId
              ? {
                  ...conv,
                  lastMessage: {
                    ...conv.lastMessage,
                    read: true,
                  },
                }
              : conv
          )
        );
      }
    } catch (err) {
      console.error("Failed switchConversation().", err);
    }
  };

  // know if currentUser is receiver or sender in activeConversations
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
                              conversation?.myInterlocutorAvatar
                                ? `http://localhost:${process.env.REACT_APP_PORT}/` +
                                  conversation?.myInterlocutorAvatar
                                : defaultAvatar
                            }
                            alt="Avatar"
                            className="avatar rounded-circle"
                          />
                          <div>
                            <div className="d-flex align-items-center">
                              <h6>{conversation?.myInterlocutor}</h6>
                              {conversation?.lastMessage?.read === false &&
                                conversation?.lastMessage?.receiverId ===
                                  currentUserId && (
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
                            {formatDate(conversation?.lastMessage?.updatedAt)}
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
