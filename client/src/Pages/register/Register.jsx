import "./register.scss";
import logo from "../../Components/Assets/pattes_perdues_logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
      setCities(cityNames);
    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleClick = async (e) => {
    e.preventDefault();

    await registerService.register({
      login: login,
      password: password,
      email: email,
      postalCode: postalCode,
      city: selectedCity,
    });
    navigate("/");
  };

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <div className="logo">
            <img src={logo} alt="logo pattes perdues" />
          </div>
          <h1>Créer un compte</h1>
          <form>
            <input
              type="text"
              placeholder="Pseudo"
              name="login"
              onChange={(e) => setLogin(e.target.value)}
              value={login}
            ></input>
            <input
              type="email"
              placeholder="Email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            ></input>
            <input
              type="password"
              placeholder="Mot de passe"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
            ></input>
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
            {error && error.message}
            <Button onClick={handleClick}>S'inscrire</Button>
          </form>
          <div className="connection">
            <span>Vous avez déjà un compte ?</span>
            <Link to="/login">
              <Button>Connexion</Button>
            </Link>
          </div>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
};

export default Register;
