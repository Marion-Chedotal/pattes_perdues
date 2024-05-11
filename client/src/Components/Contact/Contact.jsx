import React, { useState } from "react";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Button from "../../Components/Btn/Button";
import defaultAvatar from "../../Assets/default_avatar.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import ConversationService from "../../Services/ConversationService";

const Contact = () => {
  const { receiverId, postId } = useParams();
  const { user, token } = useSelector((state) => state.auth);
  const currentUserId = user.id;
  const interlocutorData = receiverId;
  const {REACT_APP_PORT} = process.env;
  const message = [];

  const navigate = useNavigate();

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
        await ConversationService.start(
          currentUserId,
          {
            ...formData,
            senderId: currentUserId,
            receiverId: receiverId,
            PostId: postId,
          },
          token
        );
        navigate(`/profil/${user?.login}`);
      }
    } catch (err) {
      console.error("Failed startConversation().", err);
    }
  };

  const shouldDisplayDate = true;

  return (
    <div>
    <Header />
    <main className="contact">
        <div className="contact">
            <div>
                <div className="mb-3">
                {message.shouldDisplayDate && <span>{message.messageDate}</span>}
                {message?.UserId !== currentUserId && (
                    <div className="d-flex align-items-start gap-2">
                    <div className="align-self-end">
                        <img
                        src={
                            interlocutorData?.Receiver?.avatar
                            ? `http://localhost:${process.env.REACT_APP_PORT}/` +
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
                            ? `http://localhost:${REACT_APP_PORT}/` +
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
        </main>
        <Footer />
    </div>
  );
};

export default Contact;
