import React from "react";
import "./notFound.scss";
import Header from "../../Components/Header/Header";
import Button from "../../Components/Btn/Button";
import Footer from "../../Components/Footer/Footer";
import { Link } from "react-router-dom";
import { Image } from "react-bootstrap";
import notFoundPicture from "../../Assets/not_found.jpg";

const notFound = () => {
  return (
    <div className="notFound">
      <Header />
      <div className="d-flex align-items-center my-5">
        <hr className="flex-grow-1" />
        <div className="mx-3">404</div>
        <hr className="flex-grow-1" />
      </div>
      <div className="text-center redirect">
        <h3 className="mb-5">Page non trouvée</h3>
        <Image className="imgNotFound mb-5" alt="chat caché dans feuillage" src={notFoundPicture}  title="Photo by ROCCO STOPPOLONI on Unsplash"></Image>
        <div className="d-flex justify-content-center align-items-center gap-5">
          <p>Retournez à la page d'accueil:</p>
          <Link to="/">
            <Button type="button">Accueil</Button>
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default notFound;
