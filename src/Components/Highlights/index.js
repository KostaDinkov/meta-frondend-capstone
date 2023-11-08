import React, { useState, useEffect } from "react";

import styles from "./styles.module.scss";
import HighlightCard from "../HighlightCard";
import { highlightsData } from "../../data/highlights";
import Button from "../Elements/Button";

export default function Highlights() {
  const [highlights, setHighlights] = useState([]);

  useEffect(() => {
    //shuffle the array of highlights
    for (let i = highlightsData.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [highlightsData[i], highlightsData[j]] = [
        highlightsData[j],
        highlightsData[i],
      ];

      //pick the first 3 elements from the array
      let selected = highlightsData.slice(0, 3);
      setHighlights(selected);
    }
  }, []);
  return (
    <section className={styles.highlightsSection}>
      <div className={styles.highlightsContent}>
        <div className={styles.headingBar}>
          <h1>Specials</h1>
          <Button type="primary">Order Online</Button>
        </div>
        <div className={styles.cardsContainer}>
          {highlights.map((h) => (
            <HighlightCard key={h.title} data={h} />
          ))}
        </div>
      </div>
    </section>
  );
}
