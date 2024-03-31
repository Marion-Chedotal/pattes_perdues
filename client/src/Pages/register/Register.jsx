import "./register.scss";
import logo from "../../Components/Assets/pattes_perdues_logo.png";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import registerService from "../../Services/Register.service";
import Button from "../../Components/Btn/BtnLogin";

const Register = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handlePostalCodeChange = async (e) => {
    const postalCode = e.target.value;
    setPostalCode(postalCode);

    if (postalCode.length === 5) {
      const cityNames = await registerService.getCity(postalCode);
      if (cityNames.length === 0) {
        setError(Error.register.cityNotFound);
      } else {
        setError(null);
        setCities(cityNames);
      }
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      const response = await registerService.register({
        login: login,
        password: password,
        email: email,
        postalCode: postalCode,
        city: selectedCity,
      });
      // if (response.status >= 400) {
      //   throw new Error("Erreur lors de l'enregistrement."); // Générer une nouvelle erreur
      // }
      navigate("/");
    } catch (error) {
      setError(error);
    }
  };

  return (
    <div className="register container">
      <div className="row ml-5">
        <div className="part d-flex">
          <div className="left col-md-6 d-flex flex-column justify-content-center align-items-center">
            <div className="logo">
              <img src={logo} alt="logo pattes perdues" />
            </div>
            <h1 className="fs-2">Créer un compte</h1>
            <form className="d-flex flex-column">
              <input
                type="text"
                placeholder="Pseudo"
                name="login"
                onChange={(e) => setLogin(e.target.value)}
                value={login}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="password"
                placeholder="Mot de passe"
                aria-describedby="passwordHelpBlock"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <div id="passwordHelpBlock" className="form-text">
                Le mot de passe doit contenir au moins une lettre minuscule, une
                lettre majuscule, un chiffre , un caractères spéciaux:
                !@#$%^*()_+, et une longueur comprise entre 10 et 32 caractères.
              </div>
              <input
                type="text"
                placeholder="Code postal"
                value={postalCode}
                onChange={handlePostalCodeChange}
                maxLength={5}
              />
              <select value={selectedCity} onChange={handleCityChange} required>
                <option value="">Sélectionnez votre ville</option>
                {cities.map((city, index) => (
                  <option key={index} value={city}>
                    {city}
                  </option>
                ))}
              </select>
              {error && <div className="error-message">{error.message}</div>}
              <Button onClick={handleClick}>S'inscrire</Button>
            </form>
            <div className="connection pt-5 d-flex align-items-center justify-content-center flex-wrappt-5 d-flex align-items-center justify-content-center flex-wrap">
              <span>Vous avez déjà un compte ?</span>
              <Link to="/login">
                <Button>Connexion</Button>
              </Link>
            </div>
          </div>
          <div className="right d-none d-sm-block col-md-6">
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
