import "./register.scss";
import logo from "../../assets/pattes_perdues_logo.png";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import authService from "../../services/authService";
import Button from "../../components/btn/Button";
import { validateRegisterInputs } from "../../utils/errorInputs";
import errorMessage from "../../utils/errorMessages.json";
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
    setErrMsg("");
  };

  const handlePostalCodeChange = async (e) => {
    const value = e.target.value;
    setErrMsg("");

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
    const inputErrors = validateRegisterInputs(inputs);

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
      navigate("/", {
        state: {
          successMessage:
            "Votre profil a bien été créé avec succès, veuillez vous connecter pour accéder à votre profil !",
        },
      });
    } catch (err) {
      let errorMessage;

      if (err?.errorCode) {
        errorMessage = t(`authentication.${err.errorCode}`);
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
    <div className="register container">
      <div className="row ml-5">
        <div className="part d-flex">
          <div className="left d-flex flex-column">
            <Link to="/" className="logo mx-auto">
              <img src={logo} alt="logo pattes perdues" />
            </Link>
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
                value={inputs.login}
                onChange={handleChange}
              />
              {validation.login && (
                <div className="alert alert-danger">{validation.login}</div>
              )}
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={inputs.email}
                onChange={handleChange}
              />
              {validation.email && (
                <div className="alert alert-danger">{validation.email}</div>
              )}
              <input
                type="password"
                placeholder="Mot de passe"
                name="password"
                value={inputs.password}
                onChange={handleChange}
              />
              {validation.password && (
                <div className="alert alert-danger">{validation.password}</div>
              )}
              <input
                type="text"
                placeholder="Code postal"
                name="postalCode"
                value={inputs.postalCode}
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
              <select
                name="selectedCity"
                value={inputs.selectedCity}
                onChange={handleChange}
                required
              >
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
          <div className="right d-none d-md-block">
            <div className="background-image"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
