import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import typeService from "../../Services/TypeService";
import categoryService from "../../Services/PetCategoryService";
import postService from "../../Services/PostService";
import { AuthContext } from "../../Context/AuthContext";
import Button from "../../Components/Btn/Button";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import { Row, Col } from "react-bootstrap";
import "./postForm.scss";

const PostForm = () => {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser.id;

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
    addressId: "",
    PetCategoryId: "",
    UserId: "",
    TypeId: "",
  });

  // fetch Types
  const [types, setTypes] = useState([]);
  const [selectedTypeId, setSelectedTypeId] = useState("");

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
  const [petCategories, setPetCategories] = useState([]);
  const [selectedCatId, setSelectedCatId] = useState("");

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (name === "TypeId") {
      setSelectedTypeId(value);
      console.log("Selected Type Id:", value);
    }

    if (name === "PetCategoryId") {
      setSelectedCatId(value);
      console.log("Selected Category Id:", value);
    }
  };

  // picture
  const handleFileChange = (event) => {
    const file = event.target.files[0];
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postService.register({
        ...formData,
        PetCategoryId: formData.selectedPetCategoryId,
        UserId: currentUserId,
        TypeId: formData.selectedTypeId,
      });
      // navigate(`/annonces/${id}`);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Header />
      <h2 className="text-center my-5">Votre annonce</h2>
      <form className="post-form" onSubmit={handleSubmit}>
        <Row className="mb-3 mx-5 align-items-center justify-content-center">
          <Col md={6}>
            <label>
              Type d'annonce
              <select
                onChange={handleChange}
                value={formData.TypeId}
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
            <label>
              Catégories d'animal
              <select
                onChange={handleChange}
                value={selectedCatId}
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
                className="me-4"
                onChange={handleFileChange}
                required
              />
            </label>
            {formData.picture && (
              <div className="text-center mt-4">
                <h5>Prévisualisation de l'image</h5>
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
            <label>
              Genre :
              <select name="gender" onChange={handleChange} required>
                <option value="">Sélectionner le genre</option>
                <option value="mâle">Mâle</option>
                <option value="femelle">Femelle</option>
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
            <label>
              Date :
              <input
                type="date"
                name="alert_date"
                value={formData.alert_date}
                onChange={handleChange}
                placeholder="Correspond à la date à laquelle l'animal a été vu pour la dernière fois, ou reccueilli"
                required
              />
            </label>
            <label>
              Description :
              <textarea
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Expliquer la situation"
                row={5}
                required
              />
            </label>
            <label>
              Signes Distinctifs :
              <textarea
                type="text"
                name="distinctive_signs"
                value={formData.distinctive_signs}
                onChange={handleChange}
                placeholder="Pour faciliter l'identification, indiquer si l'animal porte des signes distintifs"
                row={5}
                required
              />
            </label>
          </Col>
        </Row>
        <Row className="mb-3 mx-5 align-items-center justify-content-center">
          <Col md={6}>
            <label>
              Rue :
              <input
                type="text"
                name="street"
                value={formData.street}
                onChange={handleChange}
              />
            </label>
            <label>
              Code postal :
              <input
                type="text"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleChange}
              />
            </label>
            <label>
              Ville :
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </label>
          </Col>
          <Col md={6}>
            <div className="d-flex align-items-center justify-content-between">
              <p >L'animal est-il tatoué ?</p>
              <input
                type="radio"
                name="tattoo"
                value="true"
                onChange={handleChange}
              />
              <label >Oui</label>
              <input
                type="radio"
                name="tattoo"
                value="false"
                onChange={handleChange}
              />
              <label>Non</label>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p>L'animal est-il pucé ?</p>

              <input
                type="radio"
                name="tattoo"
                value="true"
                onChange={handleChange}
              />
              <label>Oui</label>
              <input
                type="radio"
                name="tattoo"
                value="false"
                onChange={handleChange}
              />
              <label>Non</label>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <p>L'animal a t-il un collier ?</p>
              <input
                type="radio"
                name="tattoo"
                value="true"
                onChange={handleChange}
              />{" "}
              <label> Oui</label>
              <input
                type="radio"
                name="tattoo"
                value="false"
                onChange={handleChange}
              />{" "}
              <label>Non</label>
            </div>
          </Col>
        </Row>
        <div className="text-center">
          <Button className="" type="submit">
            Publier le post
          </Button>
        </div>
      </form>

      <Footer />
    </div>
  );
};

export default PostForm;
