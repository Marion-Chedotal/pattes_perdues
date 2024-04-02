import "./login.scss";
import logo from "../../Components/Assets/pattes_perdues_logo.png";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../../Services/Auth.service";
import Button from "../../Components/Btn/Button";
import { useTranslation } from "react-i18next";

const Login = () => {
  const { t } = useTranslation();

  const [inputs, setInputs] = useState({
    login: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState("");

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await authService.login(inputs);
      navigate("/");
    } catch (err) {
    
      const errorMessage = t(`authentication.${err.error}`);
      setErrMsg(errorMessage);
    }
  };

  return (
    <div className="login container">
      <div className="row ml-5">
        <div className="part d-flex">
          <div className="left d-none d-sm-block col-md-6"></div>
          <div className="right col-md-6 d-flex flex-column">
            <div className="logo mx-auto">
              <img src={logo} alt="logo pattes perdues" />
            </div>
            <h1 className="fs-2 fw-bold">Se connecter</h1>
            <form className="d-flex flex-column" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Pseudo"
                name="login"
                onChange={handleChange}
              ></input>
              <input
                type="password"
                placeholder="Mot de passe"
                name="password"
                onChange={handleChange}
              ></input>
              {errMsg && (
                <div className="error-message">{errMsg.toString()}</div>
              )}
              <Button type="submit">Se connecter</Button>
            </form>
            <div className="inscription pt-5 d-flex align-items-center justify-content-evenly flex-wrap">
              <span>Vous n'avez pas encore de compte ?</span>
              <Link to="/register">
                <Button>Inscription</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
