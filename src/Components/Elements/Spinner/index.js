import React from "react";
import styles from "./styles.module.css";

export default function Spinner({ visible }) {
  if (visible) {
    return (
      <div className={styles.spinnerOverlay}>
        <div className={styles.spinner}></div>
      </div>
    );
  }
}
