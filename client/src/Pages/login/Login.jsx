import "./login.scss";
import logo from "../../Components/Assets/pattes_perdues_logo.png";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <div className="login">
      <div className="card">
        <div className="left"></div>
        <div className="right">
          <div className="logo">
            <img src={logo} alt="logo pattes perdues" />
          </div>
          <h1>Se connecter</h1>
          <form>
            <input type="text" placeholder="Pseudo"></input>
            <input type="password" placeholder="Mot de passe"></input>
          </form>
          <button>Se connecter</button>
          <div className="inscription">
            <span>Vous n'avez pas encore de compte ?</span>
            <Link to="/register">
              <button>Inscription</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
