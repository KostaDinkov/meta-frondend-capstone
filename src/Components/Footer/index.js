import React from "react";
import logo from "../../Images/logo-mono-footer.png";
import Nav from "../Nav";
import styles from "./styles.module.scss";

export default function Footer() {
  return (
    <footer>
      <div className={styles.footerContent}>
        <article>
          <img src={logo} alt="Little restaurant logo" />
        </article>
        <article>
          <h2>Contacts</h2>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
            quam alias eligendi cupiditate animi quia voluptates quos doloremque
          </p>
        </article>
        <article className={styles.socialMedia}>
          <h2>Links to social media</h2>
          <ul>
            <li>
              <a href="https://www.facebook.com">Facebook</a>
            </li>
            <li>
              <a href="https://www.instagram.com">Instagram</a>
            </li>
            <li>
              <a href="https://www.linkedin.com">LinkedIn</a>
            </li>
          </ul>
        </article>
        <article className="footer-navigation">
          <h2>Site Navigation</h2>
          <Nav position={"footer"} />
        </article>
      </div>
    </footer>
  );
}
