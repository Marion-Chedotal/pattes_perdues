import React, { useEffect, useState } from "react";
import "./profilCard.scss";
import { useSelector } from "react-redux";
import userService from "../../services/userService";
import postService from "../../services/postService";
import { capitalizeFirstLetter } from "../../utils/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import defaultAvatar from "../../assets/default_avatar.png";
import { Tooltip } from "react-tooltip";

const ProfilCard = ({ showUserPosts }) => {
  const { user, token } = useSelector((state) => state.auth);
  const currentUserId = user.id;
  const [userData, setUserData] = useState(null);
  const [postNumber, setPostNumber] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // fetch global user information
        const data = await userService.getUserInformation(currentUserId, token);

        setUserData(data);
        // fetch user's post
        const number = await postService.getUserNumberOfPost(
          currentUserId,
          token
        );
        setPostNumber(number);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchUserData();
  }, [currentUserId, token]);

  return (
    <div className="profil">
      <h4 className="text-center mb-5">Mon profil</h4>
      <div className="profilCard">
        <div className="d-flex justify-content-evenly align-items-center">
          <img
            className="avatar rounded-circle"
            src={
              userData?.avatar
                ? `http://localhost:${process.env.REACT_APP_PORT}/` + userData.avatar
                : defaultAvatar
            }
            alt="user avatar"
            title="defaultAvatar:Photo by FOX on Pexels"
          />
          <p className="fs-4">{user?.login}</p>
        </div>
        <div className="d-flex justify-content-evenly mt-5">
          <div>
            <div className="d-flex align-items-center mb-2">
              <h6 className="mb-0 me-2">Email:</h6>
              <span>{userData?.email}</span>
            </div>

            <div className="d-flex align-items-center">
              <h6 className="mb-0 me-3">Ville: </h6>
              <span className="me-2">{userData?.postalCode}</span>
              <span>
                {userData?.city
                  ? capitalizeFirstLetter(userData?.city)
                  : ""}
              </span>
            </div>
          </div>
          <div>
            <button type="button" onClick={showUserPosts} className="MyBtn">
              <div
                className="d-flex align-items-center flex-column gap-2"
                data-tip
                data-tooltip-id="tooltip-annonce"
                data-tooltip-content="Mes annonces"
              >
                <FontAwesomeIcon icon={faNewspaper} className="icons" />
                <span className="fw-bold">{postNumber}</span>
                <Tooltip id="tooltip-annonce" effect="solid"></Tooltip>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilCard;
