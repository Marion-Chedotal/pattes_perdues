import React, { useEffect, useState } from "react";
import "./ConversationCard.scss";
import { useSelector, useDispatch } from "react-redux";
import MessageService from "../../Services/MessageService";
import Button from "../../Components/Btn/Button";

const ConversationCard = ({ conversation }) => {
  const {user, token} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const currentUserId = user.id;
  const receiverId = conversation?.Messages[0]?.receiverId;

  const [formData, setFormData] = useState({
    content: ''
  });

  function handleContentChange(e) {
    setFormData({
      ...formData,
      content: e.target.value,
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.content && formData.content.trim() !== '') {
        const response = await MessageService.addMessage(
          conversation?.id,
          {
            ...formData,
            senderId: currentUserId,
            receiverId: receiverId,
            conversationId: conversation.id
          },
          token
        );

        // todo: refresh conversation
      }
    } catch (err) {
      console.error("Failed sendMessage().", err);
    }
  };

  return (
    <div>
      {conversation ? (
        <div>
          {conversation?.Messages.map((message) => (
            <div>
              <p value={message?.id} className={message?.UserId === currentUserId ? "text-start" : "text-end"}>{message?.content}</p>
            </div>
          ))}
          <div>
            <form
              className="d-flex flex-column"
              onSubmit={handleSubmit}
              method="POST"
              encType="multipart/form-data"
            >
              <textarea
                class="form-control"
                aria-label="With textarea"
                placeholder="Votre message ici"
                name="content"
                value={formData.content}
                onChange={handleContentChange}
              >
              </textarea>
              <Button type="submit">
                Envoyer
              </Button>
            </form>
          </div>
        </div>
      ) : (
        <p className="text-center fw-bold">
          No messages yet.
        </p>
      )
    }
    </div>
  );
};

export default ConversationCard;
