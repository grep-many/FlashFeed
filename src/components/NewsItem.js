import React from 'react'
import defaultImg from '../assets/defaultImg.jpg'

const NewsItem =(props)=> {

    let { title, description, imageUrl, url, published,author ,source} = props;
    return (
      <div className="card col-md-3 m-2 bg-black border-2 border-light text-light" style={{width: '18rem'}}>
        <img src={imageUrl?imageUrl:defaultImg} className="card-img-top mt-3" alt="News" />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title?(title.length < 42 ? title :title.slice(0,42)+'...'):''}<span className="badge rounded-pill bg-light text-black mx-3" style={{zIndex:1,fontSize:'10px'}}>{source?source:'unknown'}</span></h5>
          <p className="card-text">{description?(description.length < 88 ? description :description.slice(0,88)+'...'):''}</p>
          <p className="card-text"><small className="text-muted" style={{ fontSize: "0.85rem",textDecoration:"none"}}><strong>By {author}</strong> On {published.substring(0,10)}</small></p>
          <a href={url} target='_blank' rel="noopener noreferrer" className="btn btn-sm btn-black text-light mt-auto border-1 border-light">Read More</a>
        </div>
      </div>
    )
}

export default NewsItem