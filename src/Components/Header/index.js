import React from "react";
import logo from "../../Images/lemon.png";
import Nav from "../Nav";
import styles from "./styles.module.scss";
import menuIcon from "../../Images/hamburger-menu.svg";
import { useOverlayContext } from "../../Context/OverlayContext";

export default function Header() {
  const { overlayState, setOverlayState } = useOverlayContext();

  return (
    <header>
      <div className={styles.headerContent}>
        <img className={styles.headerLogo} src={logo} alt="Little Lemon logo" />
        <div className={styles.logoText}>
          <span className={styles.logoType}>LITTLE</span>
          <span className={styles.logoType}>LEMON</span>
        </div>
        <Nav />
        <img
          className={styles.hamburger}
          src={menuIcon}
          alt="hamburger menu icon"
          onClick={() => {
            setOverlayState({ isOpen: true });
          }}
        />
      </div>
    </header>
  );
}
