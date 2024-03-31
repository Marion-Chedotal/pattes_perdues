import "./login.scss";
import logo from "../../Components/Assets/pattes_perdues_logo.png";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../../Components/Btn/BtnLogin";

const Login = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  return (
    <div className="login container">
      <div className="row ml-5">
        <div className="part d-flex">
          <div className="left d-none d-sm-block col-md-6"></div>
          <div className="right col-md-6 d-flex flex-column ">
            <div className="logo mx-auto">
              <img src={logo} alt="logo pattes perdues" />
            </div>
            <h1 className="fs-2">Se connecter</h1>
            <form className="d-flex flex-column">
              <input
                type="text"
                placeholder="Pseudo"
                name="login"
                onChange={(e) => setLogin(e.target.value)}
                value={login}
              ></input>
              <input
                type="password"
                placeholder="Mot de passe"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              ></input>
               {error && <div className="error-message">{error.message} </div>}
            </form>
            <Button>Se connecter</Button>
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
