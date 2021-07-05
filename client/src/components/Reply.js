import React, {useState , useEffect } from 'react';
import './NewsCards.css';
import SendIcon from '@material-ui/icons/Send';
import { IconButton } from '@material-ui/core';
import 'react-toastify/dist/ReactToastify.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
export default function Reply({discussion , notifyAddReplySuccess , notifyFailure , changeRequestData}){
    const history = useHistory();
    const [id,setId]=useState("");
    const [email,setEmail]=useState("");
    const [name,setName]=useState("");
    const [open,setOpen]=useState(false);
    const [reply,setReply]=useState("");
    useEffect(()=>{
      const id=localStorage.getItem("user_id");
      const name=localStorage.getItem("user_name");
      const email=localStorage.getItem("user_email");
      setId(id);
      setEmail(email);
      setName(name);
    },[])

    const addReplyHandler=async ()=>{
        let queryObject={
          email:email,
          name:name,
          description:discussion.description,
          title:discussion.title,
          question:discussion.question,
          reply:reply
        }
        let response=await axios.post('/addReply', queryObject , {headers:{"Content-Type" : "application/json",accept: 'application/json'}})
        if(response.statusText==="OK")
        {
          changeRequestData();
          notifyAddReplySuccess();
          setReply("");
        }
        else
        {
          notifyFailure();
        }
      }
    return(
        <div className="holder">
        <textarea
                     name="reply" 
                     value={reply}
                     placeholder="Reply to this question here !"
                     onChange={e=>setReply(e.target.value)}
                     rows="3" cols="50"
                     className="Input"
                 />
        {(reply==="")?(<p className="text description"><IconButton ><SendIcon color="action" /></IconButton></p>):(
        <p className="text description"><IconButton onClick={()=>addReplyHandler()}><SendIcon color="error"/></IconButton></p>
        )}
        </div>
)
}