import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import typeService from "../../Services/TypeService";
import categoryService from "../../Services/PetCategoryService";
import authService from "../../Services/AuthService";
import postService from "../../Services/PostService";
import Button from "../../Components/Btn/Button";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Row, Col } from "react-bootstrap";
import { Tooltip } from "react-tooltip";
import "./postForm.scss";
import errorMessage from "../../Utils/errorMessages.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { validatePostInputs } from "../../Utils/errorInputs";

const PostForm = () => {
  const { t } = useTranslation();
  const { user, token } = useSelector((state) => state.auth);
  const currentUserId = user?.id;

  const [types, setTypes] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState("");
  const [petCategories, setPetCategories] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState("");
  const [picture, setPicture] = useState(null);

  // validation input
  const [validation, setValidation] = useState({});
  // global errors
  const [errMsg, setErrMsg] = useState("");

  const [formData, setFormData] = useState({
    gender: "",
    alert_date: "",
    description: "",
    name: "",
    tattoo: "",
    microchip: "",
    collar: "",
    distinctive_signs: "",
    picture: "",
    is_active: "",
    street: "",
    postalCode: "",
    selectedCity: "",
  });

  // fetch Types
  useEffect(() => {
    const fetchTypes = async () => {
      try {
        const { data } = await typeService.getType();

        setTypes(data);
      } catch (error) {
        console.error("Error fetching types:", error);
      }
    };

    fetchTypes();
  }, []);

  // fetch pet category
  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const { data } = await categoryService.getPetCategory();
        setPetCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategory();
  }, []);

  const navigate = useNavigate();

  // handleChange Parts

  // Picture
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setPicture(file);
    const reader = new FileReader();

    reader.onloadend = () => {
      // Mettre à jour l'URL de l'image avec l'URL du fichier chargé
      setFormData({ ...formData, picture: reader.result });
    };

    if (file) {
      // Lecture du contenu du fichier sous forme d'URL
      reader.readAsDataURL(file);
    }
  };

  // PostalCode
  const handlePostalCodeChange = async (e) => {
    const value = e.target.value;

    if (value.length <= 5) {
      setFormData((prevInputs) => ({
        ...prevInputs,
        postalCode: value,
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
              noCity: errorMessage.post.cityNotFound,
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

    // for Type and Pet Category select
    if (name === "selectedTypeId") {
      setSelectedTypeId(value);
    } else if (name === "selectedCatId") {
      setSelectedCatId(value);
    }

    setValidation((prevErrors) => ({
      ...prevErrors,
      [name]: null,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputErrors = validatePostInputs(formData);

    if (Object.keys(inputErrors).length > 0) {
      setValidation(inputErrors);
    }

    try {
      const pictureUpload = new FormData();
      pictureUpload.append("picture", picture);

      const response = await postService.register(
        {
          gender: formData.gender,
          alert_date: formData.alert_date,
          description: formData.description,
          name: formData.name,
          tattoo: formData.tattoo,
          microchip: formData.microchip,
          collar: formData.collar,
          distinctive_signs: formData.distinctive_signs,
          PetCategoryId: selectedCatId,
          UserId: currentUserId,
          TypeId: selectedTypeId,
          is_active: true,
          street: formData.street,
          postalCode: formData.postalCode,
          city: formData.selectedCity,
          picture: picture,
        },
        token
      );

      navigate(`/annonce/${response.postId}`);
    } catch (err) {
      console.log(err);
      const errorMessage = t(`post.${err?.errorCode}`);
      setErrMsg(errorMessage);
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div>
      <Header />
      <h2 className="text-center my-5">Votre annonce</h2>
      <form
        className="post-form"
        onSubmit={handleSubmit}
        method="POST"
        action="/upload"
        encType="multipart/form-data"
      >
        {errMsg && <div className="alert alert-danger">{errMsg}</div>}
        <Row className="mb-3 mx-5 align-items-center justify-content-center">
          <Col md={6}>
            <label className="required">
              Type d'annonce
              <select
                onChange={handleChange}
                name="selectedTypeId"
                className="form-select"
              >
                <option value="">Sélectionner : </option>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
              {validation.selectedTypeId && (
                <div className="alert alert-danger">
                  {validation.selectedTypeId}
                </div>
              )}
            </label>
          </Col>
          <Col md={6}>
            <label className="required">
              Catégories d'animal
              <select
                onChange={handleChange}
                name="selectedCatId"
                className="form-select"
              >
                <option value="">Sélectionner : </option>
                {petCategories.map((petCategory) => (
                  <option key={petCategory.id} value={petCategory.id}>
                    {petCategory.label}
                  </option>
                ))}
              </select>
              {validation.selectedCatId && (
                <div className="alert alert-danger">
                  {validation.selectedCatId}
                </div>
              )}
            </label>
          </Col>
        </Row>
        <Row className="mb-3 mx-5 align-items-center justify-content-center">
          <Col md={6}>
            <label
              className="tooltip-img"
              data-tip
              data-tooltip-id="tooltip-img"
              data-tooltip-content="Format attendu: jpg/png/jpeg, Taille maximale autorisée: 1Mo."
            >
              Image :
              <FontAwesomeIcon icon={faCircleInfo} className="ms-3" />
              <Tooltip id="tooltip-img" effect="solid"></Tooltip>
              <input
                type="file"
                name="picture"
                className="mx-4 my-2 border border-0"
                onChange={handleFileChange}
              />
            </label>
            {formData.picture && (
              <div className="text-center my-3">
                <h6>Prévisualisation de l'image</h6>
                <img
                  src={formData.picture}
                  alt="Preview"
                  style={{ maxWidth: "100%", maxHeight: "400px" }}
                />
              </div>
            )}
          </Col>
          <Col md={6}>
            {" "}
            <label className="required">
              Genre :
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Sélectionner le genre</option>
                <option value="Mâle">Mâle</option>
                <option value="Femelle">Femelle</option>
                <option value="Inconnu">Inconnu</option>
              </select>
              {validation.gender && (
                <div className="alert alert-danger">{validation.gender}</div>
              )}
            </label>
            <label>
              Nom de l'animal :
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>
            <label
              className="required tooltip-date "
              data-tip
              data-tooltip-id="tooltip-date"
              data-tooltip-content="Indiquer la date à laquelle l'animal a été reccueilli ou vu pour la dernière fois."
            >
              Date :
              <FontAwesomeIcon icon={faCircleInfo} className="ms-2" />
              <Tooltip id="tooltip-date" effect="solid"></Tooltip>
            </label>
            <input
              type="date"
              name="alert_date"
              value={formData.alert_date}
              onChange={handleChange}
            />
            {validation.alert_date && (
              <div className="alert alert-danger">{validation.alert_date}</div>
            )}
            <label className="required">
              Description :
              <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Expliquer la situation"
              />
            </label>
            {validation.description && (
              <div className="alert alert-danger">{validation.description}</div>
            )}
            <label>
              Signes Distinctifs de l'animal:
              <textarea
                type="text"
                name="distinctive_signs"
                value={formData.distinctive_signs}
                onChange={handleChange}
                placeholder="Cela peut faciliter l'indentification de l'animal"
              />
            </label>
          </Col>
        </Row>
        <Row className="mb-3 mx-5 align-items-center justify-content-center">
          <Col md={6}>
            <label className="required">
              Rue :
              <input type="text" name="street" onChange={handleChange} />
            </label>
            {validation.street && (
              <div className="alert alert-danger">{validation.street}</div>
            )}
            <label className="required">
              Code postal :
              <input
                type="text"
                name="postalCode"
                onChange={handlePostalCodeChange}
                maxLength={5}
              />
            </label>
            {validation.postalCode && (
              <div className="alert alert-danger">{validation.postalCode}</div>
            )}
            {validation.noCity && (
              <div className="alert alert-danger">{validation.noCity}</div>
            )}
            <label className="required">
              Ville
              <select name="selectedCity" onChange={handleChange}>
                <option value="">Sélectionner votre ville</option>
                {formData.cities &&
                  formData.cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
              {validation.selectedCity && (
                <div className="alert alert-danger">
                  {validation.selectedCity}
                </div>
              )}
            </label>
          </Col>
          <Col md={6}>
            <div className="questionsForm">
              <div className="d-flex justify-content-between align-items-center">
                <p className="required">L'animal est-il tatoué ?</p>
                <div className="d-flex align-items-center">
                  <label>
                    <input
                      type="radio"
                      name="tattoo"
                      value="Oui"
                      onChange={handleChange}
                    />
                    Oui
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="tattoo"
                      value="Non"
                      onChange={handleChange}
                    />
                    Non
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="tattoo"
                      value="Ne sais pas"
                      onChange={handleChange}
                    />
                    ?
                  </label>
                </div>
              </div>
              {validation.tattoo && (
                <div className="alert alert-danger">{validation.tattoo}</div>
              )}
              <div className="d-flex justify-content-between align-items-center">
                <p className="required">L'animal est-il pucé ?</p>
                <div className="d-flex align-items-center">
                  <label>
                    <input
                      type="radio"
                      name="microchip"
                      value="Oui"
                      onChange={handleChange}
                    />
                    Oui
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="microchip"
                      value="Non"
                      onChange={handleChange}
                    />
                    Non
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="microchip"
                      value="Ne sais pas"
                      onChange={handleChange}
                    />
                    ?
                  </label>
                </div>
              </div>
              {validation.microchip && (
                <div className="alert alert-danger">{validation.microchip}</div>
              )}
              <div className="d-flex justify-content-between align-items-center">
                <p className="required">L'animal a-t-il un collier ?</p>
                <div className="d-flex align-items-center">
                  <label>
                    <input
                      type="radio"
                      name="collar"
                      value="Oui"
                      onChange={handleChange}
                    />
                    Oui
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="collar"
                      value="Non"
                      onChange={handleChange}
                    />
                    Non
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="collar"
                      value="Ne sais pas"
                      onChange={handleChange}
                    />
                    ?
                  </label>
                </div>
              </div>
              {validation.collar && (
                <div className="alert alert-danger">{validation.collar}</div>
              )}
            </div>
          </Col>
        </Row>
        <div className="text-center py-5">
          <Button type="submit">Publier l'annonce</Button>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default PostForm;
