import "./login.scss";
import logo from "../../Assets/pattes_perdues_logo.png";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Components/Btn/Button";
import { useTranslation } from "react-i18next";
import authService from "../../Services/AuthService";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/authActions";

const Login = () => {
  const [inputs, setInputs] = useState({
    login: "",
    password: "",
  });

  const [errMsg, setErrMsg] = useState("");

  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login(inputs);
      dispatch(loginSuccess(data.accessToken, data.user));
      navigate("/");
    } catch (err) {
      const errorMessage = t(`authentication.${err?.errorCode}`);
      setErrMsg(errorMessage);
    }
  };

  return (
    <div className="login container">
      <div className="row ml-5">
        <div className="part d-flex">
          <div className="left d-none d-md-block col-md-6"></div>
          <div className="right col-md-6 d-flex flex-column">
            <Link to="/" className="logo mx-auto">
              <img src={logo} alt="logo pattes perdues" />
            </Link>
            <div></div>
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
                <div className="alert alert-danger">{errMsg.toString()}</div>
              )}
              <Button type="submit">Se connecter</Button>
            </form>
            <div className="inscription pt-5 d-flex align-items-center justify-content-evenly flex-wrap">
              <span>Vous n'avez pas encore de compte ?</span>
              <Link to="/register">
                <Button type="button">Inscription</Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
