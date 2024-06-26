import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import typeService from "../../services/typeService";
import categoryService from "../../services/petCategoryService";
import authService from "../../services/authService";
import postService from "../../services/postService";
import Button from "../../components/btn/Button";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Row, Col, Image } from "react-bootstrap";
import { Tooltip } from "react-tooltip";
import "./postForm.scss";
import errorMessage from "../../utils/errorMessages.json";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";
import { validatePostInputs } from "../../utils/errorInputs";
import { formatDate, decodeHtml } from "../../utils/format";

const PostForm = () => {
  const { t } = useTranslation();
  const { user, token } = useSelector((state) => state.auth);
  const currentUserId = user?.id;
  const { id } = useParams();
  const navigate = useNavigate();

  const [isUpdate, setIsUpdate] = useState(false);
  const [isModified, setIsModified] = useState(false);

  const [types, setTypes] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState("");
  const [petCategories, setPetCategories] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState("");
  const [newPicture, setNewPicture] = useState(null);

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

  // if updating: Fetch post data
  useEffect(() => {
    if (id) {
      setIsUpdate(true);

      const fetchPostDetails = async () => {
        try {
          const post = await postService.getOne(id);

          setFormData((prevFormData) => ({
            ...prevFormData,
            ...post,
            is_active: post.is_active ? "true" : "false",
            street: post?.street,
            postalCode: post?.postalCode,
            selectedCity: post?.city,
          }));

          setSelectedTypeId(post.TypeId);
          setSelectedCatId(post.PetCategoryId);
        } catch (error) {
          console.error("Error fetching post details:", error);
        }
      };

      fetchPostDetails();
    }
  }, [id]);

  // fetch Types & Pet Category
  useEffect(() => {
    const fetchData = async () => {
      try {
        const typeData = await typeService.getType();
        setTypes(typeData.data);

        const categoryData = await categoryService.getPetCategory();
        setPetCategories(categoryData.data);
      } catch (error) {
        console.error("Error fetching types & pet cateogry datas:", error);
      }
    };
    fetchData();
  }, []);

  // handleChange Parts

  // Picture
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setNewPicture(file);
    setIsModified(true);
    setErrMsg("");

    const reader = new FileReader();

    reader.onloadend = () => {
      // update picture URL with upload file
      setFormData({ ...formData, picture: reader.result });
    };

    if (file) {
      // reading url file
      reader.readAsDataURL(file);
    }
  };

  // PostalCode
  const handlePostalCodeChange = async (e) => {
    const value = e.target.value;
    setIsModified(true);
    setErrMsg("");

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
    setIsModified(true);
    setErrMsg("");

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
      pictureUpload.append("picture", newPicture);

      let is_active;
      if (isUpdate) {
        is_active = formData.is_active;
      } else {
        is_active = true;
      }

      const postData = {
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
        is_active: is_active,
        street: formData.street,
        postalCode: formData.postalCode,
        city: formData.selectedCity !== "" ? formData.selectedCity : "",
        picture: newPicture,
      };

      if (isUpdate) {
        await postService.update(id, postData, token);
        setIsModified(false);
        navigate(`/annonce/${id}`, {
          state: {
            successMessage: "Votre annonce a été modifiée avec succès !",
          },
        });
      } else {
        const response = await postService.register(postData, token);
        navigate(`/annonce/${response.id}`);
      }
    } catch (err) {
      let errorMessage;

      if (err?.errorCode) {
        errorMessage = t(`post.${err.errorCode}`);
      }

      if (!errorMessage) {
        errorMessage =
          "Une erreur s'est produite. Veuillez réessayer plus tard.";
      }
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
      <h2 className="text-center my-5">
        {isUpdate
          ? `Modification de l'annonce: ${decodeHtml(formData?.name)}`
          : "Votre annonce"}
      </h2>
      <form
        className="post-form"
        onSubmit={handleSubmit}
        method="POST"
        action="/upload"
        encType="multipart/form-data"
      >
        {errMsg && <div className="alert alert-danger">{errMsg}</div>}

        <Row className="mb-3 mx-5 align-items-center justify-content-center">
          {isUpdate && (
            <Col md={12} className="d-flex justify-content-center mb-5">
              <div className="is-active d-flex flex-column align-items-center gap-3">
                <h4 className="text-center">
                  L'animal a-t-il retrouvé son propriétaire ?
                </h4>
                <div className="d-flex  fs-5 gap-2">
                  <label>
                    <input
                      type="radio"
                      name="is_active"
                      value="false"
                      checked={formData?.is_active === "false"}
                      onChange={handleChange}
                    />
                    Oui
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="is_active"
                      value="true"
                      checked={formData?.is_active === "true"}
                      onChange={handleChange}
                    />
                    Non
                  </label>
                </div>
              </div>
            </Col>
          )}
          <Col md={6}>
            <label className="required">
              Type d'annonce
              <select
                onChange={handleChange}
                name="selectedTypeId"
                className="form-select"
                value={selectedTypeId}
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
                value={selectedCatId}
                className="form-select"
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
            <label
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
                <Image
                  src={
                    newPicture
                      ? URL.createObjectURL(newPicture)
                      : `${process.env.REACT_APP_HOST}/${formData?.picture}`
                  }
                  style={{ maxWidth: "100%", maxHeight: "400px" }}
                  alt="image de l'animal pour l'annonce"
                />
              </div>
            )}
          </Col>
          <Col md={6}>
            <label className="required">
              Genre :
              <select
                name="gender"
                value={formData?.gender}
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
            <label
              className="required"
              data-tip
              data-tooltip-id="tooltip-name"
              data-tooltip-content="Si vous ne connaissez pas le nom, indiquer l'animal et sa race. Exemple: Chien type labrador, Chat de gouttière"
            >
              Nom de l'animal :
              <FontAwesomeIcon icon={faCircleInfo} className="ms-2" />
              <Tooltip id="tooltip-name" effect="solid"></Tooltip>
              <input
                type="text"
                name="name"
                value={decodeHtml(formData?.name)}
                onChange={handleChange}
              />
            </label>
            {validation.name && (
              <div className="alert alert-danger">{validation.name}</div>
            )}
            <label
              className="required"
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
              value={formData?.alert_date || formatDate(formData?.alert_date)}
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
                value={decodeHtml(formData?.description)}
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
                value={decodeHtml(formData?.distinctive_signs)}
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
                value={decodeHtml(formData.street)}
                onChange={handleChange}
              />
            </label>
            {validation.street && (
              <div className="alert alert-danger">{validation.street}</div>
            )}
            <label className="required">
              Code postal :
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
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
              <select
                name="selectedCity"
                onChange={handleChange}
                value={formData.selectedCity}
              >
                <option value="">Sélectionner votre ville</option>
                {formData?.cities &&
                  formData?.cities.map((city, index) => (
                    <option key={index} value={city}>
                      {decodeHtml(city)}
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
                      checked={formData?.tattoo === "Oui"}
                    />
                    Oui
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="tattoo"
                      value="Non"
                      onChange={handleChange}
                      checked={formData?.tattoo === "Non"}
                    />
                    Non
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="tattoo"
                      value="Ne sais pas"
                      onChange={handleChange}
                      checked={formData?.tattoo === "Ne sais pas"}
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
                      checked={formData?.microchip === "Oui"}
                    />
                    Oui
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="microchip"
                      value="Non"
                      onChange={handleChange}
                      checked={formData?.microchip === "Non"}
                    />
                    Non
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="microchip"
                      value="Ne sais pas"
                      onChange={handleChange}
                      checked={formData?.microchip === "Ne sais pas"}
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
                      checked={formData?.collar === "Oui"}
                    />
                    Oui
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="collar"
                      value="Non"
                      onChange={handleChange}
                      checked={formData?.collar === "Non"}
                    />
                    Non
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="collar"
                      value="Ne sais pas"
                      onChange={handleChange}
                      checked={formData?.collar === "Ne sais pas"}
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
          <Button type="submit" disabled={!isModified}>
            {isUpdate ? "Mettre à jour" : "Publier l'annonce"}
          </Button>
        </div>
      </form>
      <Footer />
    </div>
  );
};

export default PostForm;
