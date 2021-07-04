import React, {useState , useEffect } from 'react';
import './NewsCards.css';
import SendIcon from '@material-ui/icons/Send';
import {TextField} from '@material-ui/core';
import { ToastContainer, toast } from 'react-toastify';
import { IconButton } from '@material-ui/core';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import 'react-toastify/dist/ReactToastify.css';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
export default function Question({newsElem}){
    const history = useHistory();
    const [id,setId]=useState("");
    const [email,setEmail]=useState("");
    const [name,setName]=useState("");
    const [open,setOpen]=useState(false);
    const [question,setQuestion]=useState("");
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
        let response=await axios.post('http://localhost:3001/addToReadingList', queryObject , {headers:{"Content-Type" : "application/json",accept: 'application/json'}})
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
        let response=await axios.post('http://localhost:3001/addQuestionToDiscussions', queryObject , {headers:{"Content-Type" : "application/json",accept: 'application/json'}})
        if(response.statusText==="OK")
        {
          notifyCommentSuccess();
          setQuestion("")
        }
        else
        {
          notifyFailure();
        }
      }
      console.log(newsElem)
    return(
        <div>
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
        <div className="holder">
        {(id===null)?(<p className="text description"><IconButton onClick={()=>authHandler()}><BookmarkIcon color="action" /></IconButton></p>):(
        <p className="text description"><IconButton onClick={()=>addClickHandler()}><BookmarkBorderIcon color="error"/></IconButton></p>
        )}
        {(id===null)?(<p className="text description"><IconButton onClick={()=>authHandler()}><ChatBubbleIcon color="action" /></IconButton></p>):(
        <p className="text description"><IconButton onClick={()=>showHideQuestion()}><ChatBubbleOutlineIcon color="error"/></IconButton></p>
        )}
        </div>
        {open && <div className="holder">
        <TextField
        margin="outline"
        multiline
        rows={2}
        required
        fullWidth
        id="question"
        label="Have a question in mind? Move it to Discussions"
        name="question"
        value={question}
        onInput={ e=>setQuestion(e.target.value)}
        />
        {(question==="")?(<p className="text description"><IconButton ><SendIcon color="action" /></IconButton></p>):(
        <p className="text description"><IconButton onClick={()=>addQuestionClickHandler()}><SendIcon color="error"/></IconButton></p>
        )}
        </div>}
        </div>
)
}