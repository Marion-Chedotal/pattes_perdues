import React from "react";
import "./Profil.scss";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import NavBarProfil from "../../Components/navBarProfil/NavBarProfil";

const Profil = () => {
  return (
    <div>
      <Header/>
      <NavBarProfil />
      <Footer/>
    </div>
  );
};

export default Profil;
