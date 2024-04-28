import React from "react";
import "./Profil.scss";
import Header from "../../Components/Header/Header";
import Footer from "../../Components/Footer/Footer";
import NavBarProfil from "../../Components/navBarProfil/NavBarProfil";
import ProfilCard from '../../Components/ProfilCard/ProfilCard'

const Profil = () => {
  return (
    <div>
      <Header/>
      <NavBarProfil />
      <ProfilCard/>
      <Footer/>
    </div>
  );
};

export default Profil;
