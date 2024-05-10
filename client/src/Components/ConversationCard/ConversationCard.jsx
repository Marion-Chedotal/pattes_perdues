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
  const interlocutorData = conversation?.Messages[0];

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

  let previousDate = null;
  const messagesWithDateDisplay = conversation.Messages.map((message) => {
    const messageDate = formatDate(message?.createdAt);
    const shouldDisplayDate = messageDate !== previousDate;
    previousDate = messageDate;
    return {
      ...message,
      messageDate,
      shouldDisplayDate,
    };
  });

  return (
    <div className="conversation">
      <div>
        {messagesWithDateDisplay.map((message) => (
          <div key={message.id} className="mb-3">
            {message.shouldDisplayDate && <span>{message.messageDate}</span>}
            {message?.UserId !== currentUserId && (
              <div className="d-flex align-items-start gap-2">
                <div className="align-self-end">
                  <img
                    src={
                      interlocutorData?.Receiver?.avatar
                        ? "http://localhost:3001/" +
                          interlocutorData?.Receiver?.avatar
                        : defaultAvatar
                    }
                    alt="Avatar"
                    className="avatar rounded-circle"
                  />
                </div>

                <div>
                  <p value={message?.id} className="text-start">
                    {message?.content}
                  </p>
                </div>
              </div>
            )}
            {message?.UserId === currentUserId && (
              <div className="d-flex justify-content-end align-items-center gap-2">
                <div>
                  <p value={message?.id} className="text-start">
                    {message?.content}
                  </p>
                </div>
                <div className="align-self-end">
                  <img
                    src={
                      interlocutorData?.Sender?.avatar
                        ? "http://localhost:3001/" +
                          interlocutorData?.Sender?.avatar
                        : defaultAvatar
                    }
                    alt="Avatar"
                    className="avatar rounded-circle"
                  />
                </div>
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
              <FontAwesomeIcon icon={faPaperPlane} className="ps-2" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;
