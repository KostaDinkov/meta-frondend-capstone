import React from "react";
import styles from "./styles.module.scss";
import { testimonialsData } from "../../data/testimonials";
import TestimonialCard from "../TestimonialCard";
import ScrollContainer from "react-indiana-drag-scroll";

export default function Testimonials() {
  return (
    <section className={styles.testimonialsSection}>
      <div className={styles.testimonialsContent}>
        <h2>Testimonials</h2>
        <ScrollContainer  >
          <div className={styles.testimonialsCards}>
            {testimonialsData.map((data) => (
              <TestimonialCard key={data.name} data={data} />
            ))}
          </div>
        </ScrollContainer>
      </div>
    </section>
  );
}
