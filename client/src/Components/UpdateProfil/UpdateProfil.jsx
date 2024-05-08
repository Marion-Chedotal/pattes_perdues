import React, { useEffect, useState } from "react";
import "./UpdateProfil.scss";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserService from "../../Services/UserService";
import authService from "../../Services/AuthService";
import defaultAvatar from "../../Assets/default_avatar.png";
import Button from "../Btn/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import errorMessage from "../../Utils/errorMessages.json";
import { useTranslation } from "react-i18next";
import { validateUserInputs } from "../../Utils/errorInputs";

const UpdateProfil = () => {
  const { t } = useTranslation();
  const { user, token } = useSelector((state) => state.auth);
  const currentUserId = user.id;
  const { login } = useParams();
  const navigate = useNavigate();

  const [newPicture, setNewPicture] = useState(null);
  const [isModified, setIsModified] = useState(false);

  // validation input
  const [validation, setValidation] = useState({});
  // global errors
  const [errMsg, setErrMsg] = useState("");

  const [formData, setFormData] = useState({
    password: "",
    email: "",
    avatar: "",
    postalCode: "",
    selectedCity: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch global user information
        const data = await UserService.getUserInformation(currentUserId, token);
        setFormData((prevFormData) => ({
          ...prevFormData,
          ...data,
          postalCode: data?.Address?.postalCode,
          selectedCity: data?.Address?.city,
        }));
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, [currentUserId, token]);

  // Avatar
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNewPicture(file);
    setIsModified(true);

    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({ ...formData, avatar: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };

  // PostalCode
  const handlePostalCodeChange = async (e) => {
    const value = e.target.value;
    setIsModified(true);

    if (value.length <= 5) {
      setFormData((prevInputs) => ({
        ...prevInputs,
        postalCode: value,
        selectedCity: "",
      }));

      if (value.length === 5) {
        setValidation((prevErrors) => ({
          ...prevErrors,
          postalCode: undefined,
        }));
        try {
          const cityNames = await authService.getCity(value);
          setFormData((prevInputs) => ({
            ...prevInputs,
            cities: cityNames || [],
          }));

          if (!cityNames || cityNames.length === 0) {
            setValidation((prevErrors) => ({
              ...prevErrors,
              noCity: errorMessage.userUpdate.cityNotFound,
            }));
          } else {
            setValidation((prevErrors) => ({
              ...prevErrors,
              noCity: undefined,
            }));
          }
        } catch (error) {
          setValidation({ postalCode: error.message });
        }
      }
    }
  };

  // Global
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
    setIsModified(true);

    setValidation((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  // Update user information
  const handleSaveChanges = async (e) => {
    e.preventDefault();
    const inputErrors = validateUserInputs(formData);

    if (Object.keys(inputErrors).length > 0) {
      setValidation(inputErrors);
    }

    try {
      const pictureUpload = new FormData();
      pictureUpload.append("avatar", newPicture);

      const updatedFormData = {
        password: formData.password,
        email: formData.email,
        avatar: newPicture,
        postalCode: formData.postalCode,
        city: formData.selectedCity !== "" ? formData.selectedCity : "",
      };

      // Call the UserService to update user information
      await UserService.updateUserInformation(login, updatedFormData, token);
      setIsModified(false);
      navigate(`/profil/${user.login}`, {
        state: {
          successMessage: "Votre profil a bien été modifié avec succès !",
        },
      });
    } catch (error) {
      const errorMessage = t(`userUpdate.${error.errorCode}`);
      setErrMsg(errorMessage);
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <form
      onSubmit={handleSaveChanges}
      method="POST"
      action="/upload"
      encType="multipart/form-data"
    >
      {errMsg && <div className="alert alert-danger text-center">{errMsg}</div>}
      <div className="updateProfil my-5 py-5">
        <div className="updateCard text-center pb-5">
          <h4>Modification de votre profil</h4>
          <div className="my-4">
            <div className="d-inline-block position-relative changeAvatar me-4">
              <label htmlFor="avatarInput">
                <img
                  className="avatar rounded-circle"
                  src={
                    newPicture
                      ? URL.createObjectURL(newPicture)
                      : formData?.avatar
                      ? "http://localhost:3001/" + formData.avatar
                      : defaultAvatar
                  }
                  alt="avatar"
                />
              </label>
              <input
                id="avatarInput"
                type="file"
                hidden
                name="avatar"
                className="mx-4 my-2 border border-0"
                onChange={handleFileChange}
              />
              <label
                htmlFor="avatarInput"
                className="avatarTooltip px-2 position-absolute bottom-0 start-100 translate-middle-x"
              >
                <div
                  className="flex items-center gap-2"
                  data-tip
                  data-tooltip-id="tooltip-profil"
                  data-tooltip-content="Changer mon avatar"
                >
                  <FontAwesomeIcon icon={faPlus} />
                  <Tooltip id="tooltip-profil" effect="solid"></Tooltip>
                </div>
              </label>
            </div>
          </div>
          <div className="mb-4">
            <label className="fw-bold me-4">Mot de passe: </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          {validation.password && (
            <div className="alert alert-danger">{validation.password}</div>
          )}
          <div className="mb-4">
            <label className="fw-bold me-4">Email:</label>
            <input
              type="text"
              name="email"
              value={formData?.email}
              onChange={handleChange}
              className="form-control"
            />
          </div>
          {validation.email && (
            <div className="alert alert-danger">{validation.email}</div>
          )}
          <div className="mb-4">
            <label className="fw-bold me-4">Code postal: </label>
            <input
              type="text"
              name="postalCode"
              value={formData?.postalCode}
              onChange={handlePostalCodeChange}
              maxLength={5}
              className="form-control"
            />
          </div>
          {validation.postalCode && (
            <div className="alert alert-danger">{validation.postalCode}</div>
          )}
          {validation.noCity && (
            <div className="alert alert-danger">{validation.noCity}</div>
          )}
          <div className="mb-5">
            <label className="fw-bold me-4">Ville: </label>
            <select
              name="selectedCity"
              value={formData.selectedCity}
              onChange={handleChange}
              className="form-control"
            >
              <option value="">Sélectionner votre ville</option>
              {formData.cities &&
                formData.cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
            </select>
          </div>
          <Button type="submit" disabled={!isModified}>
            <span className="fw-bold">Enregistrer les modifications</span>
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UpdateProfil;
