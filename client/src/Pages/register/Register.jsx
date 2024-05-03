import "./register.scss";
import logo from "../../Assets/pattes_perdues_logo.png";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import authService from "../../Services/AuthService";
import Button from "../../Components/Btn/Button";
import validateInputs from "../../Utils/errorRegister";
import errorMessage from "../../Utils/errorMessages.json";
import { useTranslation } from "react-i18next";

const Register = () => {
  const { t } = useTranslation();

  const [inputs, setInputs] = useState({
    login: "",
    password: "",
    email: "",
    postalCode: "",
    selectedCity: "",
    cities: [],
  });

  // validation input
  const [validation, setValidation] = useState({});
  // global errors
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });

    setValidation((prevErrors) => ({
      ...prevErrors,
      [name]: undefined,
    }));
  };

  const handlePostalCodeChange = async (e) => {
    const value = e.target.value;

    if (value.length <= 5) {
      setInputs((prevInputs) => ({
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
          setInputs((prevInputs) => ({
            ...prevInputs,
            cities: cityNames || [],
          }));

          if (!cityNames || cityNames.length === 0) {
            setValidation((prevErrors) => ({
              ...prevErrors,
              noCity: errorMessage.register.cityNotFound,
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputErrors = validateInputs(inputs);

    if (Object.keys(inputErrors).length > 0) {
      setValidation(inputErrors);
    }

    try {
      await authService.register({
        login: inputs.login,
        password: inputs.password,
        email: inputs.email,
        postalCode: inputs.postalCode,
        city: inputs.selectedCity,
      });
      navigate("/");
    } catch (err) {
      const errorMessage = t(`authentication.${err?.errorCode}`);
      setErrMsg(errorMessage);
      window.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="register container">
      <div className="row ml-5">
        <div className="part d-flex">
          <div className="left col-md-6 d-flex flex-column">
            <div className="logo mx-auto">
              <img src={logo} alt="logo pattes perdues" />
            </div>
            <h1 className="fs-2 fw-bold">Créer un compte</h1>
            <form
              className="d-flex flex-column"
              onSubmit={handleSubmit}
              noValidate
            >
              {errMsg && <div className="alert alert-danger">{errMsg}</div>}
              <input
                type="text"
                placeholder="Pseudo"
                name="login"
                onChange={handleChange}
              />
              {validation.login && (
                <div className="alert alert-danger">{validation.login}</div>
              )}
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
              {validation.email && (
                <div className="alert alert-danger">{validation.email}</div>
              )}
              <input
                type="password"
                placeholder="Mot de passe"
                name="password"
                onChange={handleChange}
              />
              {validation.password && (
                <div className="alert alert-danger">{validation.password}</div>
              )}
              <input
                type="text"
                placeholder="Code postal"
                name="postalCode"
                onChange={handlePostalCodeChange}
                maxLength={5}
              />
              {validation.postalCode && (
                <div className="alert alert-danger">
                  {validation.postalCode}
                </div>
              )}
              {validation.noCity && (
                <div className="alert alert-danger">{validation.noCity}</div>
              )}
              <select name="selectedCity" onChange={handleChange} required>
                <option value="">Sélectionner votre ville</option>
                {inputs.cities &&
                  inputs.cities.map((city, index) => (
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
              <Button type="submit">S'inscrire</Button>
            </form>
            <div className="connection pt-5 d-flex align-items-center justify-content-center flex-wrap">
              <span>Vous avez déjà un compte ?</span>
              <Link to="/login">
                <Button type="button">Connexion</Button>
              </Link>
            </div>
          </div>
          <div className="right d-none d-md-block col-md-6"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
