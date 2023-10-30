import React from "react";
import styles from "./styles.module.scss";
import { Link } from "react-router-dom";

export default function Nav({ position }) {
  const menuStyle =
    position === "footer" ? styles.positionFooter : styles.positionHeader;
  return (
    <nav>
      <menu className={menuStyle}>
        <Link to="/">Home</Link>
        <Link to="#">About</Link>
        <Link to="#">Menu</Link>
        <Link to="/booking">Reservations</Link>
        <Link to="#">Order Online</Link>
        <Link to="#">Login</Link>
      </menu>
    </nav>
  );
}
