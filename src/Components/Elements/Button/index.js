import React from "react";
import styles from "./styles.module.scss";

export default function Button({ type, children, onClick }) {
  let classes = [styles.button];

  switch (type) {
    case "primary":
      classes.push(styles.primary);
      break;
    case "disabled":
      classes.push(styles.disabled);
      break;
    default:
      classes.push(styles.normal);
      break;
  }

  classes = classes.join(" ");
  return (
    <button className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
