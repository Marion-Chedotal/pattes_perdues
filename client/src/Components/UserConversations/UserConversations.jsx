import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./UserConversations.scss";
import ConversationService from "../../Services/ConversationService";
import ConversationCard from "../ConversationCard/ConversationCard";
import { formatDate } from "../../Utils/format";
import defaultAvatar from "../../Assets/default_avatar.png";
import Button from "../Btn/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackward } from "@fortawesome/free-solid-svg-icons";

const UserConversations = () => {
  const { token } = useSelector((state) => state.auth);
  const { login } = useParams();

  const [conversations, setConversations] = useState([]);
  const [activeConversationId, setActiveConversationId] = useState(null);
  const [activeConversation, setActiveConversation] = useState(null);
  const [noResults, setNoResults] = useState(false);

  useEffect(() => {
    const fetchUserConversations = async () => {
      try {
        const userConversations =
          await ConversationService.getUserConversations(login, token);
        setConversations(userConversations);
        if (userConversations.length === 0) return setNoResults(true);
        setNoResults(false);
      } catch (error) {
        console.error("Error fetching conversations:", error);
      }
    };
    fetchUserConversations();
  }, [login, token]);

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
                    activeConversation?.Messages[0]?.User?.avatar
                      ? `http://localhost:${REACT_APP_PORT}/` +
                        activeConversation.user.avatar
                      : defaultAvatar
                  }
                  alt="Avatar"
                  className="avatar rounded-circle"
                />
                <h6>{activeConversation?.Messages[0]?.Receiver?.login}</h6>
              </div>
              <div>
                <h5 className="mt-2">
                  Annonce pour {activeConversation?.Post?.name}
                </h5>
              </div>

              <div className="mt-5">
                  <div className="conversationCard py-5 px-5">
                    <ConversationCard conversation={activeConversation} />
                  </div>
              </div>
            </div>
          ) : (
            <>
              <h5 className="mb-5 text-center">Discussions</h5>
              <div className="list-group discussions">
                {noResults ? (
                  <p className="text-center fw-bold">
                    Vous n'avez pas encore de conversations.
                  </p>
                ) : (
                  conversations?.map((conversation) => (
                    <button
                      key={conversation?.id}
                      onClick={() => switchConversation(conversation?.id)}
                      type="button"
                      className={
                        conversation?.id === activeConversationId
                          ? "list-group-item list-group-item-action active border border-0"
                          : "list-group-item list-group-item-action border border-0"
                      }
                    >
                      <div className="d-flex justify-content-between">
                        <div className="d-flex justify-content-start gap-2 mb-2">
                          <img
                            src={
                              conversation?.avatar
                                ? `http://localhost:${REACT_APP_PORT}/` + conversation.avatar
                                : defaultAvatar
                            }
                            alt="Avatar"
                            className="avatar rounded-circle"
                          />
                          <div>
                            <h6>{conversation?.conversation_partner}</h6>
                            <span className="mb-3">
                              Annonce pour {conversation?.name}
                            </span>
                          </div>
                        </div>
                        <div className="d-flex justify-content-end">
                          <span className="mb-3">
                            {formatDate(conversation?.updatedAt)}
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
