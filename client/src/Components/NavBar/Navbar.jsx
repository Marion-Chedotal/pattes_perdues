import React from "react";
import "./Navbar.scss";

import logo from "../Assets/pattes_perdues_logo.png";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src={logo} alt="logo pattes perdues" />
      </div>
      <ul className="nav-menu">
        <li>Voir les annonces</li>
        <li>Créer une annonce</li>
        <li>Blog</li>
      </ul>
      <div className="navlogin">
        <button>Login</button>
      </div>
    </div>
  );
};

export default Navbar;
