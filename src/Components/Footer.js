import React from "react";
import logo from "../Images/logo-mono-footer.png";
import Nav from "./Nav";
import "./Footer.css";

export default function Footer() {
  return (
    <footer>
      <div className="section-content">
        <article className="">
          <img src={logo} alt="" />
        </article>
        <article className="">
          <h3>Contacts</h3>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
            quam alias eligendi cupiditate animi quia voluptates quos doloremque
          </p>
        </article>
        <article className="social-media">
          <h3>Links to social media</h3>
          <ul>
            <li>
              <a href="">Facebook</a>
            </li>
            <li>
              <a href="">Instagram</a>
            </li>
            <li>
              <a href="">LinkedIn</a>
            </li>
          </ul>
        </article>
        <article className="footer-navigation">
          <h3>Site Navigation</h3>
          <Nav position={"footer"} />
        </article>
      </div>
    </footer>
  );
}
