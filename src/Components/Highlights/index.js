import React from "react";
import styles from "./styles.module.scss";
import HighlightCard from "../HighlightCard";
import { highlightsData } from "../../data/highlights";
import Button from "../Elements/Button";



export default function Highlights() {
  return (
    <section className={styles.highlightsSection}>
      <div className={styles.highlightsContent}>
        <div className={styles.headingBar}>
          <h1>Specials</h1>
          <Button type='primary'>Order Online</Button>
        </div>
        <div className = {styles.cardsContainer}>
          {highlightsData.map((h) => (
            <HighlightCard key={h.title} data={h} />
          ))}
        </div>
      </div>
    </section>
  );
}
