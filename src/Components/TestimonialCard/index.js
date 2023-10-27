import React from "react";
import "./styles.scss";

export default function TestimonialCard({ data }) {
  return (
    <article className="testimonial-card">
      <p>{[...Array(data.rating)].map((e,i)=><span key={i}>⭐</span>)}</p>

      <div className="testimonial-card-info">
          <img className="profile-picture" src={data.image} alt="profile" />
          <div>
              <h3>{data.name}</h3>
          </div>
      </div>
      <p>{data.comment}</p>
    </article>
  );
}
