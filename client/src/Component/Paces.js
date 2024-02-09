import React from "react";
import I8 from "../Images/8.jpg";
import I6 from "../Images/6.jpg";
import I10 from "../Images/10.jpg";
import I5 from "../Images/5.jpg";
import I9 from "../Images/9.jpg";
import I4 from "../Images/4.jpg";
import I3 from "../Images/3.jpg";
import I7 from "../Images/7(1).jpg";
import I12 from "../Images/12.jpg";
import "./places.css"; // Import your custom CSS for styling
import { useNavigate } from "react-router-dom";

const Paces = () => {
  const Navigate = useNavigate();
  return (
    <div>
      <div className="paces-container" style={{ backgroundColor: "#00a896" }}>
        <div className="paces-content">
          <div className="paces-text" id="About" >
            <h1>Parcourez le monde grâce à</h1>
            <h2>Sublime Travel</h2>
            <p className="white-text" >
              sublimeTravel Agency propose les meilleurs forfaits vacances
              depuis 2021. Nous garantissons que chaque voyage que vous réservez
              avec nous sera unique et inoubliable.
            </p>
          </div>
          <div className="d-flex paces-images">
            <img src={I8} alt="Image 8" className="paces-image" />
            <img src={I6} alt="Image 6" className="paces-image" />
          </div>
        </div>
      </div>
      <div className="paces-container" style={{ backgroundColor: "#3c6e71" }}>
        <div className="paces-content">
          <div className="paces-text">
            <h2 className="large-heading animated fadeInLeft infinite" id="Package">Nos forfaits</h2>
            <p className="white-text">
              Nous vous proposons une grande variété de forfaits parmi lesquels
              choisir, en fonction de la destination de vos rêves !
            </p>
            <div className="d-flex justify-content-center">
              <div onClick={()=>Navigate('/reservation')} className="btn-reserve">
                Réservez
              </div>
            </div>
          </div>
          <div className="paces-images">
            <img src={I10} alt="Image 10" className="paces-image" />
          </div>
        </div>
      </div>
      <div className="paces-container" style={{ backgroundColor: "#3a919e" }}>
        <div className="paces-content">
          <div className="d-flex paces-images">
            <div className="image-container">
              <img src={I12} alt="Image 5" className="paces-image1" />
            </div>
          </div>
          <div className="d-flex paces-images">
            <div className="image-container">
              <img src={I9} alt="Image 9" className="paces-image1" />
            </div>
          </div>
        </div>
      </div>

      <h1
        style={{
          textAlign: "center",
          color: "white",
          backgroundColor: "#3a919e",
          margin: "0px",
        }}
        id="Press"
      >
        ACTUALITÉS
      </h1>
      <div className="card-container"  style={{ backgroundColor: "#3a919e" }}>
        <div className="card carte">
          <img src={I4} alt="Image 4" className="card-image" />
          <div className="card-description">
            <h2>fonctionnalités d'actualité</h2>
            <p>
              Les articles d'actualité constituent un excellent moyen d'informer
              les clients des nouveaux produits et services, des événements, des
              récompenses et bien plus encore.
            </p>
          </div>
        </div>
        <div className="card carte">
          <img src={I3} alt="Image 3" className="card-image" />
          <div className="card-description">
            <h2>Voyage Illimité</h2>
            <p>
              Les articles d'actualité constituent un excellent moyen d'informer
              les clients des nouveaux produits et services, des événements, des
              récompenses et bien plus encore.
            </p>
          </div>
        </div>
        <div className="card carte">
          <img src={I7} alt="Image 7" className="card-image" />
          <div className="card-description">
            <h2>Trixie Voyages</h2>
            <p>
              Les articles d'actualité constituent un excellent moyen d'informer
              les clients des nouveaux produits et services, des événements, des
              récompenses et bien plus encore.
            </p>
          </div>
        </div>
      </div>
      <div className="background-container">
        <div className="text-overlay">
          <h1>Réservez votre</h1>
          <h1>prochain voyage</h1>
          <h1>avec nous</h1>
        </div>
      </div>
      <footer className="footer" id="contact">
        <div className="footer-section">
          <h3>Location</h3>
          <p>
            Cité les Dunes lot n°419 local 2 Bouzed ALi -Calma, Chéraga, Algeria
          </p>
        </div>
        <div className="footer-section">
          <h3>Email</h3>
          <p>sublime.travel.dz@gmail.com</p>
        </div>
        <div className="footer-section">
          <h3>Telephone</h3>
          <p>0673 37 49 10</p>
        </div>
      </footer>
        <p className="test">Copyright © 2023  All Rights Reserved</p>
    </div>
  );
};

export default Paces;
