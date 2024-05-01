import React, { useEffect, useState } from "react";
import "./ProfilCard.scss";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../store/authActions";
import UserService from "../../Services/UserService";
import postService from "../../Services/PostService";
import { capitalizeFirstLetter } from "../../Utils/format";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faNewspaper, faSave } from "@fortawesome/free-solid-svg-icons";
import defaultAvatar from "../../Assets/default_avatar.png";
import { Tooltip } from "react-tooltip";
import Button from "../Btn/Button";

const ProfilCard = ({ showUserPosts }) => {
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const currentUserId = user.id;
  const [userData, setUserData] = useState(null);
  const [postNumber, setPostNumber] = useState(0);
  const [editedLogin, setEditedLogin] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // fetch global user information
        const data = await UserService.getUserInformation(currentUserId, token);
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

  // update user information
  const handleSaveChanges = async () => {
    try {
      // Call the UserService to update user information
      const updatedUser = await UserService.updateUserInformation(
        currentUserId,
        {
          login: editedLogin,
        },
        token
      );

      dispatch(updateUser(updatedUser.data.login));
      // Exit editing mode
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating user information:", error);
    }
  };

  return (
    <div className="profil my-5 py-5">
      <div className="profilCard">
        <div className="d-flex justify-content-evenly align-items-center">
          <img
            className="avatar rounded-circle"
            src={user?.avatar ? user.avatar : defaultAvatar}
            alt="avatar"
          />
          {isEditing ? (
            <input
              type="text"
              value={editedLogin}
              onChange={(e) => setEditedLogin(e.target.value)}
            />
          ) : (
            <p className="fs-4">{user?.login}</p>
          )}
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
                {userData?.data?.Address?.city
                  ? capitalizeFirstLetter(userData.data.Address.city)
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

          {isEditing ? (
            <Button type="button" onClick={handleSaveChanges}>
              <FontAwesomeIcon icon={faSave} className="icons" />
              <span className="fw-bold">Enregistrer</span>
            </Button>
          ) : (
            <button type="button" onClick={() => setIsEditing(true)}>
              Modifier
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilCard;
