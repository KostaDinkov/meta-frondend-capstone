import React from "react";
import styles from "./styles.module.scss";

export default function About() {
  return (
    <section className={styles.aboutSection}>
      <div className={styles.aboutContent}>
        <div className={styles.info}>
          <h1>Little Lemon</h1>
          <h4>Chicago</h4>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nulla
            rerum voluptate iste non perspiciatis ipsum similique,
            exercitationem veniam ad quidem, sapiente incidunt aliquid sint
            cumque repudiandae maxime unde. At, similique!
          </p>
        </div>
      </div>
    </section>
  );
}
