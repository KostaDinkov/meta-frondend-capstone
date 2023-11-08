import React from "react";
import styles from "./styles.module.scss";
import firstOwner from "../../Images/owner1.jpg";
import secondOwnder from "../../Images/owner2.jpg";

export default function About() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutContent}>
        <div className={styles.headingText}>
          <h3>Little Lemon</h3>
          <span>Chicago</span>
        </div>
        <div className={styles.info}>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
            rerum voluptate iste non perspiciatis ipsum similique,
            exercitationem veniam ad quidem, sapiente incidunt aliquid sint
            cumque repudiandae maxime unde. At, similique!
          </p>
        </div>

        <img
          className={styles.imageFirst}
          src={firstOwner}
          alt="owner of little lemon restaurant"
        />
        <img
          className={styles.imageSecond}
          src={secondOwnder}
          alt="owner of little lemon restaurant"
        />
      </div>
    </section>
  );
}
