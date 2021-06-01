import React from 'react';
import './NewsCards.css';
function News({data,error}){
  const newsRenderer=data.map((newsElem)=>
            {
            let date = new Date(newsElem.publishedAt) 
            return(
              <div className="container" key={newsElem.title}>
                {(newsElem.urlToImage)?<img src={newsElem.urlToImage} className="image"></img>:<img className="image"/>}
                <div className="centered">
                <p className="text heading">{newsElem.title}</p>
                {(newsElem.author) && <p className="text author">Written by <b>{newsElem.author}</b></p>}
                <p className="text description">{newsElem.description}</p>
                {(newsElem.source.name) && <p className="text author">Read more at <a href={newsElem.url} target="_blank" rel="noreferrer"><b>{newsElem.source.name}</b></a></p>}
                </div>
              </div>
            );
            })
    return(
      <div>
      {(error)?(<div>{error}</div>):((data.length!==0 && data!==undefined)?(
        <div>
        {newsRenderer}
        </div>):(<div>Loading</div>))}
      </div>
    );
}

export default News;