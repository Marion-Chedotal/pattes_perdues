import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "./UserConversations.scss";
import ConversationService from "../../Services/ConversationService";
import ConversationCard from "../ConversationCard/ConversationCard";

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
        const userConversations = await ConversationService.getUserConversations(login, token)
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
        const conversation = await ConversationService.getOne(login, activeConversationId, token);
        setActiveConversation(conversation);
      }
    } catch (err) {
      console.error("Failed switchConversation().", err);
    }
  };

  return (
    <div class="container">
      <div class="row">
        <div class="col-4">
          <div class="list-group">
          {noResults ? (
            <p className="text-center fw-bold">
              Vous n'avez pas encore de conversations.
            </p>
          ) : (
            conversations.map((conversation) => (
              <button onClick={() => switchConversation(conversation?.id)} type="button" className={conversation?.id === activeConversationId ? "list-group-item list-group-item-action active" : "list-group-item list-group-item-action"}>
                <span>{conversation?.conversation_partner}</span>
                <br />
                <span><em>{conversation?.createdAt}</em></span>
              </button>
            ))
          )}
          </div>
        </div>
        <div class="col-8">
          <div class="card">
            <div class="card-body">
              <div class="container py-5">
                {activeConversation ? (
                  <ConversationCard conversation={activeConversation} />
                ) : (
                  <p className="text-center fw-bold">Vous n'avez pas sélectionné de conversation.</p> 
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserConversations;
