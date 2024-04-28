import React, { useEffect, useState } from "react";
import "./ProfilCard.scss";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import UserService from "../../Services/UserService";
import postService from "../../Services/PostService";
import { capitalizeFirstLetter } from "../../Utils/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper } from "@fortawesome/free-solid-svg-icons";
import defaultAvatar from "../../Assets/default_avatar.png";
import { Tooltip } from "react-tooltip";

const ProfilCard = () => {
  const { user, token } = useSelector((state) => state.auth);
  const currentUserId = user.id;
  const [userData, setUserData] = useState(null);
  const [postNumber, setPostNumber] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await UserService.getUserInformation(currentUserId, token);
        setUserData(data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchUserData();
  }, [currentUserId, token]);

  useEffect(() => {
    const fetchNumberOfPost = async () => {
      try {
        const number = await postService.getUserNumberOfPost(
          currentUserId,
          token
        );
        setPostNumber(number);
      } catch (err) {
        console.error("Error fetching posts:", err);
      }
    };
    fetchNumberOfPost();
  }, [currentUserId, token]);

  return (
    <div className="profil my-5 py-5">
      <div className="profilCard">
        <div className="d-flex justify-content-evenly align-items-center">
          <img
            className="avatar rounded-circle"
            src={user?.avatar ? user.avatar : defaultAvatar}
            alt="avatar"
          />
          <p className="fs-4">{user?.login}</p>
        </div>
        <div className="d-flex justify-content-evenly mt-5">
          <div>
            <div className="d-flex align-items-center mb-2">
              <h6 className="mb-0 me-2">Email:</h6>
              <span>{userData?.data?.email}</span>
            </div>

            <div className="d-flex align-items-center mb-2">
              <h6 className="mb-0 me-3">Rue: </h6>

              {userData?.data?.Address?.street ? (
                <span>{userData.data.Address.street}</span>
              ) : (
                <span>Non renseignée</span>
              )}
            </div>
            <div className="d-flex align-items-center">
              <h6 className="mb-0 me-3">Ville: </h6>
              <span className="me-2">
                {userData?.data?.Address?.postalCode}
              </span>
              <span>
                {capitalizeFirstLetter(userData?.data?.Address?.city)}
              </span>
            </div>
          </div>
          <div>
            <Link to={`/profil/${user?.login}`} className="goToMesAnnonces">
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
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilCard;
