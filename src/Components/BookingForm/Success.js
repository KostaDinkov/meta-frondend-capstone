import React from "react";
import styles from "./styles.module.scss";

export default function Success({ formState }) {
  return (
    <article className={styles.successLayout}>
      <h1>SUCCESS!</h1>
      <span>Your reservation was successful</span>
      <span>Here are your details</span>

      <div className={styles.successDetails}>
        <span>Guests:</span>
        <span>{formState.guests.value}</span>
        <span>Date:</span>
        <span>{formState.date.value}</span>
        <span>Time:</span>
        <span>{formState.time.value}</span>
        <span>Occasion:</span>
        <span>{formState.occasion.value}</span>
      </div>
      <h2>Thank You!</h2>
    </article>
  );
}
