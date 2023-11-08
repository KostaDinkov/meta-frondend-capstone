import React from "react";
import styles from "./styles.module.scss";

export default function TestimonialCard({ data }) {
  return (
    <article className={styles.card}>
      <p>
        {[...Array(data.rating)].map((e, i) => (
          <span key={i}>⭐</span>
        ))}
      </p>

      <div className={styles.info}>
        <img className={styles.image} src={data.image} alt="profile" />
        <div>
          <h3>{data.name}</h3>
        </div>
      </div>
      <p>{data.comment}</p>
    </article>
  );
}
