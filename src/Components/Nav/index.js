import React from "react";
import styles from "./styles.module.scss";

export default function Nav({ position }) {
  const menuStyle =
    position === "footer" ? styles.positionFooter : styles.positionHeader;
  return (
    <nav >
      <menu className={menuStyle}>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Menu</a>
        </li>
        <li>
          <a href="#">Reservations</a>
        </li>
        <li>
          <a href="#">Order Online</a>
        </li>
        <li>
          <a href="#">Login</a>
        </li>
      </menu>
    </nav>
  );
}
