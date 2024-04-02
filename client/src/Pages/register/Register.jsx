import "./register.scss";
import logo from "../../Components/Assets/pattes_perdues_logo.png";
import { Link, useNavigate } from "react-router-dom";
import React, { useState } from "react";
import authService from "../../Services/Auth.service";
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

  // errors from format input
  const [validationErrors, setValidationErrors] = useState({});
  // errors from server
  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  //TODO: to refacto
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({
      ...inputs,
      [name]: value,
    });

    const validationErrors = validateInputs(
      { ...inputs, [name]: value },
      errorMessage
    );
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      [name]: validationErrors[name],
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
        setValidationErrors((prevErrors) => ({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const inputErrors = validateInputs(inputs);
    setValidationErrors(inputErrors);

    if (Object.keys(inputErrors).length > 0) {
      return;
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
      const errorMessage = t(`authentication.${err}`);
      setErrMsg(errorMessage);
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
              {typeof errMsg === "string" && <div>{errMsg}</div>}
              <input
                type="text"
                placeholder="Pseudo"
                name="login"
                onChange={handleChange}
              />
              {validationErrors.login && (
                <div className="error-message">{validationErrors.login}</div>
              )}
              <input
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
              {validationErrors.email && (
                <div className="error-message">{validationErrors.email}</div>
              )}
              <input
                type="password"
                placeholder="Mot de passe"
                name="password"
                onChange={handleChange}
              />
              {validationErrors.password && (
                <div className="error-message">{validationErrors.password}</div>
              )}
              <input
                type="text"
                placeholder="Code postal"
                name="postalCode"
                onChange={handlePostalCodeChange}
                maxLength={5}
              />
              {validationErrors.postalCode && (
                <div className="error-message">
                  {validationErrors.postalCode}
                </div>
              )}
              {validationErrors.noCity && (
                <div className="error-message">{validationErrors.noCity}</div>
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
              {validationErrors.selectedCity && (
                <div className="error-message">
                  {validationErrors.selectedCity}
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
          <div className="right d-none d-sm-block col-md-6"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
