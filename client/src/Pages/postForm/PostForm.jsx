import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import typeService from "../../Services/TypeService";
import categoryService from "../../Services/PetCategoryService";
import authService from "../../Services/AuthService";
import postService from "../../Services/PostService";
import { AuthContext } from "../../Context/AuthContext";
import Button from "../../Components/Btn/Button";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Row, Col, FormLabel } from "react-bootstrap";
import "./postForm.scss";
import errorMessage from "../../Utils/errorMessages.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

const PostForm = () => {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser?.id;

  const [types, setTypes] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState("");
  const [petCategories, setPetCategories] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState("");
  const [picture, setPicture] = useState(null);

  // errors from format input
  const [validationErrors, setValidationErrors] = useState({});

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

    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const pictureUpload = new FormData();
      pictureUpload.append("picture", picture);

      const response = await postService.register(
        {
          ...formData,
          PetCategoryId: selectedCatId,
          UserId: currentUserId,
          TypeId: selectedTypeId,
          is_active: true,
          city: formData.selectedCity,
          picture: picture,
        },
        currentUser.accessToken
      );

      navigate(`/annonce/${response.postId}`);
    } catch (err) {
      // console.log(err);
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
        <Row className="mb-3 mx-5 align-items-center justify-content-center">
          <Col md={6}>
            <label className="required">
              Type d'annonce
              <select
                onChange={handleChange}
                name="selectedTypeId"
                className="form-select"
                required
              >
                <option value="">Sélectionner : </option>
                {types.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
            </label>
          </Col>
          <Col md={6}>
            <label className="required">
              Catégories d'animal
              <select
                onChange={handleChange}
                name="selectedCatId"
                className="form-select"
                required
              >
                <option value="">Sélectionner : </option>
                {petCategories.map((petCategory) => (
                  <option key={petCategory.id} value={petCategory.id}>
                    {petCategory.label}
                  </option>
                ))}
              </select>
            </label>
          </Col>
        </Row>
        <Row className="mb-3 mx-5 align-items-center justify-content-center">
          <Col md={6}>
            {" "}
            <label>
              Image :
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
                required
              >
                <option value="">Sélectionner le genre</option>
                <option value="mâle">Mâle</option>
                <option value="femelle">Femelle</option>
                <option value="femelle">Inconnu</option>
              </select>
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
            <label className="required tooltipDate">
              Date :
              <FontAwesomeIcon icon={faCircleInfo} className="ms-2" />
              <span className="tooltip">
                Indiquer la date à laquelle l'animal a été reccueilli ou vu pour
                la dernière fois.
              </span>
              <input
                type="date"
                name="alert_date"
                value={formData.alert_date}
                onChange={handleChange}
                required
              />
            </label>
            <label className="required">
              Description :
              <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Expliquer la situation"
                required
              />
            </label>
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
              <input
                type="text"
                name="street"
                onChange={handleChange}
                required
              />
            </label>
            <label className="required">
              Code postal :
              <input
                type="text"
                name="postalCode"
                onChange={handlePostalCodeChange}
                maxLength={5}
                required
              />
            </label>
            <label className="required">
              Ville
              <select name="selectedCity" onChange={handleChange} required>
                <option value="">Sélectionner votre ville</option>
                {formData.cities &&
                  formData.cities.map((city, index) => (
                    <option key={index} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
            </label>
          </Col>
          <Col md={6}>
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <p>L'animal est-il tatoué ?</p>
                <div className="d-flex align-items-center">
                  <label>
                    {" "}
                    <input
                      type="radio"
                      name="tattoo"
                      value="true"
                      onChange={handleChange}
                    />
                    Oui
                  </label>

                  <label>
                    {" "}
                    <input
                      type="radio"
                      name="tattoo"
                      value="false"
                      onChange={handleChange}
                    />
                    Non
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p>L'animal est-il pucé ?</p>
                <div className="d-flex align-items-center">
                  <label>
                    <input
                      type="radio"
                      name="microchip"
                      value="true"
                      onChange={handleChange}
                    />
                    Oui
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="microchip"
                      value="false"
                      onChange={handleChange}
                    />
                    Non
                  </label>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p>L'animal a-t-il un collier ?</p>
                <div className="d-flex align-items-center">
                  <FormLabel>
                    <input
                      type="radio"
                      name="collar"
                      value="true"
                      onChange={handleChange}
                    />
                    Oui
                  </FormLabel>

                  <label>
                    <input
                      type="radio"
                      name="collar"
                      value="false"
                      onChange={handleChange}
                    />
                    Non
                  </label>
                </div>
              </div>
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
