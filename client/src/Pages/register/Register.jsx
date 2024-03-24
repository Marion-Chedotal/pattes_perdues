import "./register.scss";
import logo from "../../Components/Assets/pattes_perdues_logo.png";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <div className="logo">
            <img src={logo} alt="logo pattes perdues" />
          </div>
          <h1>Créer un compte</h1>
          <form>
            <input type="text" placeholder="Pseudo"></input>
            <input type="email" placeholder="Email"></input>
            <input type="password" placeholder="Mot de passe"></input>
            <input type="text" placeholder="Code postal"></input>
            <input type="text" placeholder="Ville"></input>
            <button>S'inscrire</button>
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