import React from "react";
import styles from "./styles.module.scss";

export default function HighlightCard({ data }) {
  return (
    <article className={styles.highlightCard}>
      <img src={data.imageSrc} alt="" />
      <div className={styles.info}>
        <div className={styles.row}>
          <h3>{data.title}</h3>{" "}
          <span className={styles.badgeRed}>
            <span className={styles.price}>{data.price}</span>
          </span>
        </div>
        <p>{data.description}</p>
        <div className={styles.rowLastToBottom}>
          <p>Order & delivery</p>
          <span className={styles.price}>{data.deliveryPrice}</span>
        </div>
      </div>
    </article>
  );
}
