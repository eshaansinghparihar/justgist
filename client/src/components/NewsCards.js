import React, {useState , useEffect } from 'react';
import './NewsCards.css';
import Loading from './Loading';
import Question from './Question';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Error from './Error';
function News({data,error}){
  const [id,setId]=useState("");
  const [email,setEmail]=useState("");
  const [name,setName]=useState("");
  useEffect(()=>{
    const id=localStorage.getItem("user_id");
    const name=localStorage.getItem("user_id");
    const email=localStorage.getItem("user_email");
    setId(id);
    setEmail(email);
    setName(name);
  },[])
  const notifySuccess=()=>{
    toast.success('Saved to Reading List Succesfully', {
      position: "top-left",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
const notifyCommentSuccess=()=>{
    toast.success('Question posted in Discussions Succesfully', {
      position: "top-left",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }
  const notifyFailure=()=>{
    toast.error('Something went wrong', {
      position: "top-left",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      });
  }

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
                <Question newsElem={newsElem} notifyCommentSuccess={notifyCommentSuccess} notifyFailure={notifyFailure} notifySuccess={notifySuccess}/>
                </div>
              </div>
            );
            })
    return(
      <div>
      {(error)?(<Error error={error}/>):((data.length!==0 && data!==undefined)?(
        <div className="newsRender">
        <ToastContainer
                position="top-left"
                autoClose={1500}
                hideProgressBar
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
        {newsRenderer}
        </div>
        ):(<Loading/>))}
      </div>
    );
}

export default News;