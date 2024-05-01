import React, { useEffect, useState } from "react";
import "./UpdateProfil.scss";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../store/authActions";
import UserService from "../../Services/UserService";
import authService from "../../Services/AuthService";
import defaultAvatar from "../../Assets/default_avatar.png";
import Button from "../Btn/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "react-tooltip";
import validateInputs from "../../Utils/errorRegister";
import errorMessage from "../../Utils/errorMessages.json";
import { useTranslation } from "react-i18next";

const UpdateProfil = () => {
  const { t } = useTranslation();
  const { user, token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const currentUserId = user.id;
  const [error, setError] = useState(null);

  // errors from format input
  const [validationErrors, setValidationErrors] = useState({});
  // errors from server
  const [errMsg, setErrMsg] = useState("");
  const [formData, setFormData] = useState({
    login: "",
    email: "",
    postalCode: "",
    selectedCity: "",
    avatar: {
      old: user?.avatar ? user.avatar : defaultAvatar,
      new: "",
    },
    password: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // fetch global user information
        const data = await UserService.getUserInformation(currentUserId, token);
        console.log(data);
        setFormData((prevFormData) => ({
          ...prevFormData,
          login: data.login,
          email: data.email,
          postalCode: data.postalCode,
          selectedCity: data.city, // Assurez-vous que le nom de la propriété est correct selon ce qui est renvoyé par votre API
          avatar: {
            old: data.avatar ? data.avatar : defaultAvatar,
            new: "",
          },}));
      } catch (err) {
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, [currentUserId, token]);

  // Picture
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({
          ...formData,
          avatar: {
            ...formData.avatar,
            new: reader.result, // Mettre à jour l'URL du nouvel avatar avec le contenu de l'image lue
          },
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostalCodeChange = async (e) => {
    const value = e.target.value;

    if (value.length <= 5) {
      setFormData((prevInputs) => ({
        ...prevInputs,
        postalCode: value,
      }));

      if (value.length === 5) {
        setValidationErrors((prevErrors) => ({
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
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              noCity: errorMessage.register.cityNotFound,
            }));
          } else {
            setValidationErrors((prevErrors) => ({
              ...prevErrors,
              noCity: undefined,
            }));
          }
        } catch (error) {
          setValidationErrors({ postalCode: error.message });
        }
      }
    }
  };

  //TODO: to refacto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    if (name === "selectedCity") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        selectedCity: value,
      }));
    }
    const validationErrors = validateInputs(
      { ...formData, [name]: value },
      errorMessage
    );
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name],
    }));
  };

  // update user information
  const handleSaveChanges = async (e) => {
    e.preventDefault();

    const inputErrors = validateInputs(formData);
    setValidationErrors(inputErrors);

    if (Object.keys(inputErrors).length > 0) {
      return;
    }

    try {
      const updatedFormData = {
        ...formData,
        city: formData.selectedCity,
      };

      // Call the UserService to update user information
      const updatedUser = await UserService.updateUserInformation(
        currentUserId,
        updatedFormData,
        token
      );

      dispatch(updateUser(updatedUser.data.login));
    } catch (error) {
      const errorMessage = t(`modification.${error}`);
      setErrMsg(errorMessage);
    }
  };

  return (
    <form
      onSubmit={handleSaveChanges}
      method="POST"
      action="/upload"
      encType="multipart/form-data"
    >
      <div className="profil my-5 py-5">
        <div className="profilCard">
          <div className="d-flex align-items-start gap-5">
            <div className="d-inline-block position-relative changeAvatar me-4">
              {(formData.avatar?.new || formData.avatar?.old) && (
                <img
                  className="avatar rounded-circle"
                  src={formData.avatar?.new || formData.avatar?.old}
                  alt="avatar"
                />
              )}
              <label
                htmlFor="avatar"
                className="avatarIcon px-2 position-absolute bottom-0 start-100 translate-middle-x"
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
              <input
                hidden
                type="file"
                name="avatar"
                className="mx-4 my-2 border border-0"
                onChange={handleFileChange}
              />
            </div>
            <div className="d-flex flex-column">
              <div className="d-flex flex-column align-items-start mb-4">
                <label className="fw-bold">
                  Nouveau pseudo:{" "}
                  <input
                    type="text"
                    name="login"
                    value={formData.login}
                    onChange={handleChange}
                  />
                </label>
                {validationErrors.login && (
                  <div className="error-message">{validationErrors.login}</div>
                )}
              </div>
              <div className="d-flex flex-column align-items-start">
                <label htmlFor="password" className="fw-bold">
                  Nouveau mot de passe:
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                />
                {validationErrors.email && (
                  <div className="error-message">
                    {validationErrors.password}
                  </div>
                )}
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-evenly mt-5">
            <div>
              <div className="d-flex flex-column align-items-start mb-4">
                <label htmlFor="login" className="fw-bold">
                  Email:
                </label>
                <input
                  type="text"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                />
                {validationErrors.email && (
                  <div className="error-message">{validationErrors.email}</div>
                )}
              </div>

              <div className="d-flex align-items-center">
                <label className="mb-0 me-3">Code postal: </label>
                <input
                  type="text"
                  name="postalCode"
                  value={formData?.Address?.postalCode}
                  onChange={handlePostalCodeChange}
                  maxLength={5}
                />
                {validationErrors.postalCode && (
                  <div className="error-message">
                    {validationErrors.postalCode}
                  </div>
                )}
                {validationErrors.noCity && (
                  <div className="error-message">{validationErrors.noCity}</div>
                )}
                <select name="selectedCity" value={formData.selectedCity} onChange={handleChange}>
                  <option value="">Sélectionner votre ville</option>
                  {formData.cities &&
                    formData.cities.map((city, index) => (
                      <option key={index} value={city}>
                        {city}
                      </option>
                    ))}
                </select>
                {validationErrors.selectedCity && (
                  <div className="error-message">
                    {validationErrors.selectedCity}
                  </div>
                )}
              </div>
            </div>
            <Button type="submit">
              <span className="fw-bold">Enregistrer les modifications</span>
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default UpdateProfil;
