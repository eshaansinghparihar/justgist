import React, {useState , useEffect } from 'react';
import './NewsCards.css';
import SendIcon from '@material-ui/icons/Send';
import {TextField} from '@material-ui/core';
import { IconButton } from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import 'react-toastify/dist/ReactToastify.css';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
export default function Question({newsElem , notifySuccess , notifyCommentSuccess , notifyFailure }){
    const history = useHistory();
    const [id,setId]=useState("");
    const [email,setEmail]=useState("");
    const [name,setName]=useState("");
    const [open,setOpen]=useState(false);
    const [question,setQuestion]=useState("");
    useEffect(()=>{
      const id=localStorage.getItem("user_id");
      const name=localStorage.getItem("user_name");
      const email=localStorage.getItem("user_email");
      setId(id);
      setEmail(email);
      setName(name);
    },[])

    const authHandler=()=>{
        history.push("/login");
      }
      const showHideQuestion=()=>{
          setOpen(!open)
      }
      const addClickHandler=async ()=>{
        let queryObject={
          email:email,
          title:newsElem.title,
          urlToImage:newsElem.urlToImage,
          author:newsElem.author,
          description:newsElem.description,
          newsUrl:newsElem.url,
          publishedAt:newsElem.publishedAt,
          sourceName:newsElem.source.name
        }
        let response=await axios.post('/addToReadingList', queryObject , {headers:{"Content-Type" : "application/json",accept: 'application/json'}})
        if(response.statusText==="OK")
        {
          notifySuccess();
        }
        else
        {
          notifyFailure();
        }
      }
    const addQuestionClickHandler=async ()=>{
        let queryObject={
          email:email,
          title:newsElem.title,
          urlToImage:newsElem.urlToImage,
          author:name,
          description:newsElem.description,
          newsUrl:newsElem.url,
          question:question
        }
        let response=await axios.post('/addQuestionToDiscussions', queryObject , {headers:{"Content-Type" : "application/json",accept: 'application/json'}})
        if(response.statusText==="OK")
        {
          notifyCommentSuccess();
          setQuestion("");
          setOpen(false);
        }
        else
        {
          notifyFailure();
        }
      }
    return(
        <div>
        <div className="holder">
        {(id===null)?(<p className="text description"><IconButton onClick={()=>authHandler()}><BookmarkIcon color="action" /></IconButton></p>):(
        <p className="text description"><IconButton onClick={()=>addClickHandler()}><BookmarkBorderIcon color="error"/></IconButton></p>
        )}
        {(id===null)?(<p className="text description"><IconButton onClick={()=>authHandler()}><ChatBubbleIcon color="action" /></IconButton></p>):(
        <p className="text description"><IconButton onClick={()=>showHideQuestion()}><ChatBubbleOutlineIcon color="error"/></IconButton></p>
        )}
        </div>
        {open && <div className="holder">
        <textarea
                     name="question" 
                     value={question}
                     placeholder="Wish to discuss over this gist with like minded people? Ask a question and move gist to Discussions."
                     onChange={e=>setQuestion(e.target.value)}
                     rows="3" cols="50"
                     className="Input"
                 />
        {(question==="")?(<p className="text description"><IconButton ><SendIcon color="action" /></IconButton></p>):(
        <p className="text description"><IconButton onClick={()=>addQuestionClickHandler()}><SendIcon color="error"/></IconButton></p>
        )}
        </div>}
        </div>
)
}