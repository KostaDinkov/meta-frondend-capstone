import React from 'react'
import "./styles.scss"

export default function HighlightCard({data}) {
  return (
    <article className="highlight-card">
      <img src={data.imageSrc} alt=""/>
      <div className="highlight-card-info">
          <div className='card-row'>
              <h3>{data.title}</h3> <span className='card-price badge-red'>{data.price}</span>
          </div>
          <p>{data.description}</p>
          <div className="card-row last">
              <p>Order & delivery</p>
              <span className='card-price'>{data.deliveryPrice}</span>

          </div>
      </div>
    </article>
  )
}
