import React from 'react'

export default function Newsitem(props) {
  return (
    <div>
     <div className="card" style={{width:"12rem"}}>
  <div className="card-body">
    <h5 className="card-title">{props.title}</h5>
    <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href={props.newsurl} className="btn btn-sm btn-primary">Read More</a>
  </div>
</div>
    

    </div>
  )
}
