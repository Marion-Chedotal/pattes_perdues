import "./register.scss";
import logo from "../../Components/Assets/pattes_perdues_logo.png";
import { Link } from "react-router-dom";
import axios from 'axios';
import React, { useState } from "react";

const Register = () => {

  // const [inputs, setInputs] = useState({
  //   login:"",
  //   password: "",
  //   email: "",
  //   postalCode: "",
  //   city:""
  // });

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const [postalCode, setPostalCode] = useState('');
  const [cities, setCities] = useState([]);
  const [selectedCity, setSelectedCity] = useState('');
  const [error, setError] = useState(null);

  const apiUrl = 'https://apicarto.ign.fr/api/codes-postaux/communes/';

  const handlePostalCodeChange = async (e) => {
    const codePostal = e.target.value;
    setPostalCode(codePostal);

    try {
      const response = await axios.get(apiUrl + codePostal);
      if (response.status === 200) {
        if (response.data.length === 0) {
          throw new Error('Aucune commune trouvée pour ce code postal.');
        }
        const cityName = response.data.map(city => city.nomCommune);
        setCities(cityName);

        if(cityName) {
          handleClick();
        }
      }
    } catch (error) {

    }
  };

  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
  };

  const handleClick = async (e) => {
    // don't refresh the page
    e.preventDefault();
    try {
      await axios.post('http://localhost:8080/auth/register', {
      login: login,
      password: password,
      email: email,
      postalCode: postalCode,
      city: selectedCity
      })
    } catch (error) {
      console.log('ICI')
      setError(error.response.data);
    }
  }
 
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <div className="logo">
            <img src={logo} alt="logo pattes perdues" />
          </div>
          <h1>Créer un compte</h1>
          <form>
            <input type="text" placeholder="Pseudo" name="login" onChange={(e) => setLogin(e.target.value)} value={login}></input>
            <input type="email" placeholder="Email" name="email" onChange={(e) => setEmail(e.target.value)} value={email}></input>
            <input type="password" placeholder="Mot de passe" name="password" onChange={(e) => setPassword(e.target.value)} value={password}></input>
            <input type="text" placeholder="Code postal" value={postalCode} onChange={handlePostalCodeChange} />
            <select
              value={selectedCity}
              onChange={handleCityChange}
              required
            >
              <option value="">Sélectionnez votre ville</option>
              {cities.map((city) => (
                <option value={city}>
                  {city}
                </option>
              ))}
            </select> 
            {error && error.message} 
            <button onClick={handleClick}>S'inscrire</button>
          </form>
          <div className="connection">
            <span>Vous avez déjà un compte ?</span>
            <Link to="/login">
              <button>Connexion</button>
            </Link>
          </div>
        </div>
        <div className="right"></div>
      </div>
    </div>
  );
};

export default Register;