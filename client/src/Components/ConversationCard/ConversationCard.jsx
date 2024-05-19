import React, { useState } from "react";
import "./conversationCard.scss";
import { useSelector } from "react-redux";
import messageService from "../../services/messageService";
import Button from "../../components/btn/Button";
import { formatDate } from "../../utils/format";
import defaultAvatar from "../../assets/default_avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

const ConversationCard = ({ conversation, setConversation }) => {
  const { user, token } = useSelector((state) => state.auth);
  const currentUserId = user.id;

  const firstSenderId = currentUserId === conversation?.Messages[0]?.UserId;

  const receiverId = firstSenderId
    ? conversation?.Messages[0]?.receiverId
    : conversation?.Messages[0]?.UserId;

  const [content, setContent] = useState("");
  const [isContentModified, setIsContentModified] = useState(false);

  const handleContentChange = async (e) => {
    setContent(e.target.value);
    setIsContentModified(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const currentUserAvatar = conversation.Messages.find(
        (msg) => msg.UserId === currentUserId
      )?.Sender?.avatar;

      const newMessage = {
        content: content,
        UserId: currentUserId,
        receiverId: receiverId,
        ConversationId: conversation.id,
        Sender: {
          avatar: currentUserAvatar,
        },
        createdAt: new Date(),
      };

      const updatedMessages = [...conversation.Messages, newMessage];
      setConversation({ ...conversation, Messages: updatedMessages });
      setIsContentModified(false);

      await messageService.addMessage(conversation?.id, newMessage, token);
      setContent("");
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
              <div key={message.id} className="d-flex align-items-start gap-2">
                <div className="align-self-end">
                  <img
                    src={
                      message?.Sender?.avatar
                        ? `http://localhost:${process.env.REACT_APP_PORT}/${message?.Sender?.avatar}`
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
                      message?.Sender?.avatar
                        ? `http://localhost:${process.env.REACT_APP_PORT}/${message?.Sender?.avatar}`
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
          <form className="d-flex flex-column" onSubmit={handleSubmit}>
            <textarea
              className="form-control mb-4"
              aria-label="With textarea"
              placeholder="Message"
              name="content"
              value={content}
              disabled={
                !conversation?.Messages[0]?.UserId ||
                !conversation?.Messages[0]?.receiverId ||
                !conversation.PostId
              }
              onChange={handleContentChange}
            ></textarea>
            <Button
              type="submit"
              disabled={!isContentModified}
              className={!isContentModified ? "ps-2 text-muted" : "ps-2"}
            >
              Envoyer
              <FontAwesomeIcon
                icon={faPaperPlane}
                className={!isContentModified ? "ps-2 text-muted" : "ps-2"}
              />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ConversationCard;
