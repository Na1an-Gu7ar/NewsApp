import React from 'react'

const NewsItem = ({ title, description, imageUrl, newsUrl, author, date, source }) => {
  return (
    <div>
      <div className='my-3'>
        <div className="card" style={{ height: '30rem' }}>
          <div style={{ display: 'flex', justifyContent: 'flex-end', position: 'absolute', right: '0' }}>
            <span className=" badge rounded-pill bg-warning">
              {source}
            </span>
          </div>
          <img style={{maxHeight: "12rem"}} src={!imageUrl ? "https://economictimes.indiatimes.com/thumb/msid-102741408,width-1070,height-580,imgsize-211504,overlay-economictimes/photo.jpg" : imageUrl} className="card-img-top rounded mx-auto d-block" alt="..." />
          <div className="card-body" >
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{description}</p>
            <p className="card-text"><small className="text-muted">By {!author ? "unknown" : author} on {new Date(date).toGMTString()}</small></p>
            <a href={newsUrl} className="btn btn-sm btn-success">Read More</a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsItem