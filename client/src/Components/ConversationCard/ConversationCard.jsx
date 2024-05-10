import React, { useState } from "react";
import "./ConversationCard.scss";
import { useSelector } from "react-redux";
import MessageService from "../../Services/MessageService";
import Button from "../../Components/Btn/Button";
import { formatDate } from "../../Utils/format";
import defaultAvatar from "../../Assets/default_avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ConversationCard = ({ conversation }) => {
  const { user, token } = useSelector((state) => state.auth);
  const currentUserId = user.id;
  // const receiverId = conversation?.Messages[0]?.receiverId;
  const interlocutorData = conversation?.Messages[0];
  // console.log(interlocutorData);

  const [formData, setFormData] = useState({
    content: "",
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
      if (formData.content && formData.content.trim() !== "") {
        await MessageService.addMessage(
          conversation?.id,
          {
            ...formData,
            senderId: currentUserId,
            receiverId: interlocutorData.receiverId,
            conversationId: conversation.id,
          },
          token
        );

        // TODO: refresh conversation
      }
    } catch (err) {
      console.error("Failed sendMessage().", err);
    }
  };

  return (
    <div className="conversation">
      <div>
        {conversation?.Messages.map((message) => (
          <div key={message.id} className="mb-3">
            <span>{formatDate(message?.createdAt)}</span>
            {message?.UserId !== currentUserId && (
              <div className="d-flex justify-content-start align-items-center gap-2">
                <img
                  src={
                    interlocutorData?.Receiver?.avatar
                      ? "http://localhost:3001/" +
                        interlocutorData?.Receiver?.avatar
                      : defaultAvatar
                  }
                  alt="Avatar"
                  className="avatar rounded-circle"
                ></img>
                <p value={message?.id} className="text-start">
                  {message?.content}
                </p>
              </div>
            )}
            {message?.UserId === currentUserId && (
              <div className="d-flex justify-content-end align-items-center gap-2">
                <p value={message?.id} className="text-start">
                  {message?.content}
                </p>
                <img
                  src={
                    interlocutorData?.Sender?.avatar
                      ? "http://localhost:3001/" +
                        interlocutorData?.Sender?.avatar
                      : defaultAvatar
                  }
                  alt="Avatar"
                  className="avatar rounded-circle"
                ></img>
              </div>
            )}
          </div>
        ))}
        <div className="sendMessage">
          <form
            className="d-flex flex-column"
            onSubmit={handleSubmit}
            method="POST"
            encType="multipart/form-data"
          >
            <textarea
              className="form-control mb-4"
              aria-label="With textarea"
              placeholder="Message"
              name="content"
              value={formData.content}
              onChange={handleContentChange}
            ></textarea>
            <Button type="submit">
              Envoyer
              <FontAwesomeIcon icon={faPaperPlane} className="ps-2"/>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;
