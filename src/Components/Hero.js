import React from "react";
import heroImage from "../Images/img_1.jpg";
import "./Hero.css";

export default function Hero() {
  return (
    <section className="hero-section">
      <div className="section-content">
        <div className="hero-info">
          <h1>Little lemon</h1>
          <span>Chicago</span>
          <p>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Enim,
            doloribus eaque. Accusantium, cupiditate ratione. Enim, illo velit?
            Voluptatum ducimus sapiente magni nulla necessitatibus hic. Corporis
            debitis porro itaque suscipit aspernatur?
          </p>
          <button>Reserve a table</button>
        </div>

        <div className="image-container">
          <img
            className="hero-image"
            src={heroImage}
            alt="dish with fish and potatoes"
          />
        </div>
      </div>
    </section>
  );
}
