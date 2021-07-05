import React ,{ useState ,useEffect } from 'react';
import axios from 'axios';
import Reply from './Reply';
import LoadingDiscussion from './LoadingDiscussion';
import { ToastContainer, toast } from 'react-toastify';
import { Redirect, useHistory } from 'react-router-dom';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Paper ,Container, CssBaseline,CardContent , Button, Typography } from '@material-ui/core';
import Loading from './Loading';
import './Discussion.css';
import './NewsCards.css';
import { IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  submit: {
    background: 'linear-gradient(45deg, #F7971E 30%,#FFD200 110%)',
    borderRadius: 20,
    margin:theme.spacing(2),
    marginLeft:'20%',
    marginRight:'20%',
    width:'60%',
    color:'white',
    marginBottom:'5px'
  },
  container: {
    width:'100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginRight:'auto',
    marginLeft:'auto'
    
  },
  nodata:{
      margin:theme.spacing(2),
      alignItems:'center',
      width:'100%',
      justifyContent:'center',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      marginLeft:'auto',
      marginRight:'auto',
  }
}));
export default function Discussion(){
    const history = useHistory();
    const classes = useStyles();
    const [id,setId]=useState("");
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [discussions,setDiscussions]=useState([]);
    const [replies,setReplies]=useState([]);
    const [requestData, setRequestData] = useState(new Date());
    useEffect(()=>{
        const id=localStorage.getItem("user_id");
        const name=localStorage.getItem("user_name");
        const email=localStorage.getItem("user_email");
        setId(id);
        setName(name);
        setEmail(email);
        async function fetchQuestions(){
            let response = await axios.get('/fetchQuestions')
            if(response.statusText==="OK")
            {
                setDiscussions(response.data)
            }
            else
            {
                console.log("Something went wrong!")
            }
        }
        fetchQuestions();
      },[requestData])
    const notifySuccess=()=>{
    toast.success('Deleted Question from Discussions Succesfully', {
    position: "top-left",
    autoClose: 1500,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    });
    }
    const notifyAddReplySuccess=()=>{
        toast.success('Answer Posted to Question Succesfully', {
        position: "top-left",
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });
        }
    const notifyReplySuccess=()=>{
        toast.success('Deleted Answer from Question Succesfully', {
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
    const changeRequestData=()=>
    {
      setRequestData(new Date());
    }
    const logoutHandler=()=>{
    localStorage.clear();
    history.push("/login");
    }
    function Profile(){
        if(name!==""){
            var myDate = new Date();
            var hrs = myDate.getHours();
            var greet;
            if (hrs < 12)
            greet = 'Good Morning';
            else if (hrs >= 12 && hrs <= 17)
            greet = 'Good Afternoon';
            else if (hrs >= 17 && hrs <= 24)
            greet = 'Good Evening';
            return(
            <div className="container">
              <div className={classes.container}>
                  <Container component="main">
                  <CssBaseline/>
                  <div  className={classes.nodata}>
                  <CardContent>
                  <p className="text heading">{greet} , {name}. Hope you're doing good !</p>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={()=>logoutHandler()}
                  >
                   Log Out
                  </Button>
                  </CardContent>
                  </div>
                  </Container>
              </div>
              </div>
          );
          }
          else{
            return(
              <Loading/>
            );
          }
    }
    const discussionRenderer=discussions.length && discussions.map((discussion)=>
    {
    const removeQuestionHandler=async ()=>{
    let queryObject={
    email:email,
    title:discussion.title,
    }
    let response=await axios.post('/deleteQuestion', queryObject , {headers:{"Content-Type" : "application/json",accept: 'application/json'}})
    if(response.statusText==="OK")
    {
    changeRequestData();
    notifySuccess();
    }
    else
    {
    notifyFailure();
    }
    }
    const replyRenderer=discussion.replies && discussion.replies.map((reply)=>
    {
        const removeReplyHandler=async ()=>{
            let queryObject={
            email:email,
            reply:reply.reply,
            question:discussion.question,
            title:discussion.title
            }
            let response=await axios.post('/deleteReply', queryObject , {headers:{"Content-Type" : "application/json",accept: 'application/json'}})
            if(response.statusText==="OK")
            {
            changeRequestData();
            notifyReplySuccess();
            }
            else
            {
            notifyFailure();
            }
            }
        return(
            <div className="holderReplies">
            {(reply.name) && <p className="description">{reply.name} : {reply.reply}</p>}
            {(reply.email===email) && <p className="deleteReply"><IconButton onClick={()=>removeReplyHandler()}><DeleteOutlineIcon color="error"/></IconButton></p>}
            </div>
        )
    })
    return(
    <div className="container" key={discussion.title}>
    {(discussion.urlToImage)?<img src={discussion.urlToImage} className="image"></img>:<img/>}
    <div className="centered">
    <p className="text heading">{discussion.title}</p>
    <p className="text description">{discussion.description}</p>
    {(discussion.author) ? (<p className="text author">Question asked by <b>{discussion.author}</b></p>):''}
    <p className="text description">Question : {discussion.question}</p>
    <p className="text author"><a href={discussion.newsUrl} target="_blank" rel="noreferrer"><b>Read more</b></a></p>
    {discussion.replies && replyRenderer}
    <Reply discussion={discussion} notifyAddReplySuccess={notifyAddReplySuccess} notifyFailure={notifyFailure} changeRequestData={changeRequestData}/>
    </div>
    {(discussion.email===email) && <p className="text description"><IconButton onClick={()=>removeQuestionHandler()}><DeleteOutlineIcon color="error"/></IconButton></p>}
    </div>
    );
    }).reverse();
    return(
        <div class="discussionContainer">
        {(id===null)?
        <Redirect to="/login"/>
        :
        ((discussions.length===0)?(<div><Profile/><LoadingDiscussion/></div>):(
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
        <Profile/>
        {discussions.length && discussionRenderer}
        </div>))}
        </div>
    )
}