import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import typeService from "../../Services/TypeService";
import categoryService from "../../Services/PetCategoryService";
import postService from "../../Services/PostService";
import { AuthContext } from "../../Context/AuthContext";
import Button from "../../Components/Btn/Button";
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await postService.register({
        gender: formData.gender,
        alert_date: formData.alert_date,
        description: formData.description,
        name: formData.name,
        tattoo: formData.tattoo,
        microchip: formData.microchip,
        collar: formData.collar,
        distinctive_signs: formData.distinctive_signs,
        picture: formData.picture,
        is_active: formData.is_active,
        addressId: formData.addressId,
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
    <form className="post-form" onSubmit={handleSubmit}>
      <label>
        Type d'annonce
        <select onChange={handleChange} value={selectedTypeId} required>
          <option value="">Sélectionner: </option>
          {types.map((type) => (
            <option key={type.id} value={type.id}>
              {type.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Catégories d'animal
        <select onChange={handleChange} value={selectedCatId} required>
          <option value="">Sélectionner: </option>
          {petCategories.map((petCategory) => (
            <option key={petCategory.id} value={petCategory.id}>
              {petCategory.label}
            </option>
          ))}
        </select>
      </label>
      <label>
        Genre :
        <select name="gender" onChange={handleChange} required>
          <option value="">Sélectionner le genre</option>
          <option value="mâle">Mâle</option>
          <option value="femelle">Femelle</option>
        </select>
      </label>
      <label>
        Nom de l'animal:
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </label>
      <label>
        Date:
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
        Description:
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
        Signes Distinctifs:
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
      <input type="file" accept=".png, .jpg, .jpeg" onChange={handleChange} />
      {setFormData.picture && (
        <div>
          <h2>Prévisualisation de l'image</h2>
          <img
            src={setFormData.picture}
            alt="Preview"
            style={{ maxWidth: "100%", maxHeight: "300px" }}
          />
        </div>
      )}
      <label>
        L'animal est-il tatoué ?
        <input
          type="radio"
          name="tattoo"
          value="true"
          onChange={handleChange}
        />{" "}
        Oui
      </label>
      <label>
        <input
          type="radio"
          name="tattoo"
          value="false"
          onChange={handleChange}
        />{" "}
        Non
      </label>
      <label>
        L'animal est-il pucé ?
        <input
          type="radio"
          name="tattoo"
          value="true"
          onChange={handleChange}
        />{" "}
        Oui
      </label>
      <label>
        <input
          type="radio"
          name="tattoo"
          value="false"
          onChange={handleChange}
        />{" "}
        Non
      </label>
      <label>
        L'animal a t-il un collier ?
        <input
          type="radio"
          name="tattoo"
          value="true"
          onChange={handleChange}
        />{" "}
        Oui
      </label>
      <label>
        <input
          type="radio"
          name="tattoo"
          value="false"
          onChange={handleChange}
        />{" "}
        Non
      </label>
      .
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
        Code postal:
        <input
          type="text"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
        />
      </label>
      <label>
        Ville:
        <input
          type="text"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </label>
      <Button type="submit">Publier le post</Button>
    </form>
  );
};

export default PostForm;
