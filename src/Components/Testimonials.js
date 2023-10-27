import React from "react";
import "./Testimonials.scss";
import { testimonialsData } from "../data/testimonials";
import TestimonialCard from "./TestimonialCard";

export default function Testimonials() {
  return (
    <section className="testimonials-section">
      <div className="section-content">
        <h2>Testimonials</h2>
        <div className="testimonials-cards">
          {testimonialsData.map((data) => (
            <TestimonialCard key={data.name} data={data} />
          ))}
        </div>
      </div>
    </section>
  );
}
