import React from "react";
import "./Highlights.css";
import HighlightCard from "./HighlightCard";
import { highlightsData } from "../data/highlights";



export default function Highlights() {
  return (
    <section className="highlights-section">
      <div className="section-content">
        <div className="heading-bar">
          <h1>Specials</h1>
          <button>Order Online</button>
        </div>
        <div className = 'highlight-cards-container'>
          {highlightsData.map((h) => (
            <HighlightCard key={h.title} data={h} />
          ))}
        </div>
      </div>
    </section>
  );
}
