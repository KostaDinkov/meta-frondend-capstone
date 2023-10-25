import React from "react";
import logo from "../Images/logo-mono-footer.png";
import Nav from "./Nav";

export default function Footer() {
  return (
    <footer>
      <img src={logo} alt="" />
      <Nav />
      <div>
        <h3>Contacts</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto
          quam alias eligendi cupiditate animi quia voluptates quos doloremque
        </p>
      </div>
      <div>
        <h3>Social media</h3>
        <p>
          <ul>
            <li><a href="">Facebook</a></li>
            <li><a href="">Instagram</a></li>
            <li><a href="">LinkedIn</a></li>
          </ul>
        </p>
      </div>
    </footer>
  );
}
