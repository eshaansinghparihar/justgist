import React from 'react';
import './NewsCards.css';
import Loading from './Loading';
import Error from './Error';
function News({data,error}){
  const newsRenderer=data.map((newsElem)=>
            {
            let date = new Date(newsElem.publishedAt) 
            return(
              <div className="container" key={newsElem.title}>
                {(newsElem.urlToImage)?<img src={newsElem.urlToImage} className="image"></img>:<img/>}
                <div className="centered">
                <p className="text heading">{newsElem.title}</p>
                {(newsElem.author) ? (<p className="text author">Written by <b>{newsElem.author}</b> on {date.toDateString()} at {(date.getHours()<10?'0':'') + date.getHours()}:{(date.getMinutes()<10?'0':'') + date.getMinutes()} </p>):(<p className="text author">Written on {date.toDateString()} at {(date.getHours()<10?'0':'') + date.getHours()}:{(date.getMinutes()<10?'0':'') + date.getMinutes()}</p>)}
                <p className="text description">{newsElem.description}</p>
                {(newsElem.source.name) && <p className="text author">Read more at <a href={newsElem.url} target="_blank" rel="noreferrer"><b>{newsElem.source.name}</b></a></p>}
                </div>
              </div>
            );
            })
    return(
      <div>
      {(error)?(<Error error={error}/>):((data.length!==0 && data!==undefined)?(
        <div>
        {newsRenderer}
        </div>):(<Loading/>))}
      </div>
    );
}

export default News;