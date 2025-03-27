import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Dashboard.css';
import { ToastContainer, toast } from 'react-toastify';
import { IconButton } from '@material-ui/core';
import LoadingDashboard from './LoadingDashboard';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import { Container, CssBaseline, CardContent, Button } from '@material-ui/core';
import Loading from './Loading';
import { Redirect, useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  submit: {
    background: 'linear-gradient(45deg, #F7971E 30%,#FFD200 110%)',
    borderRadius: 20,
    margin: theme.spacing(2),
    marginLeft: '20%',
    marginRight: '20%',
    width: '60%',
    color: 'white',
    marginBottom: '5px'
  },
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(2),
    marginRight: 'auto',
    marginLeft: 'auto'

  },
  nodata: {
    margin: theme.spacing(2),
    alignItems: 'center',
    width: '100%',
    justifyContent: 'center',
    display: 'flex',
    flexDirection: 'row',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
}));

export default function Dashboard() {
  const history = useHistory();
  const classes = useStyles();
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [readingList, setReadingList] = useState([]);
  const [requestData, setRequestData] = useState(new Date());
  const logoutHandler = () => {
    localStorage.clear();
    history.push("/login");
  }
  function Profile() {
    if (name !== "") {
      var myDate = new Date();
      var hrs = myDate.getHours();
      var greet;
      if (hrs < 12)
        greet = 'Good Morning';
      else if (hrs >= 12 && hrs <= 17)
        greet = 'Good Afternoon';
      else if (hrs >= 17 && hrs <= 24)
        greet = 'Good Evening';
      return (
        <div className="container">
          <div className={classes.container}>
            <Container component="main">
              <CssBaseline />
              <div className={classes.nodata}>
                <CardContent>
                  <p className="text heading">{greet} , {name}. Hope you're doing good !</p>
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    className={classes.submit}
                    onClick={() => logoutHandler()}
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
    else {
      return (
        <Loading />
      );
    }
  }
  useEffect(() => {
    const id = localStorage.getItem("user_id");
    const name = localStorage.getItem("user_name");
    const email = localStorage.getItem("user_email");
    setId(id);
    setName(name);
    setEmail(email);
    async function fetchReadingList() {
      try {
        let queryObject = {
          email: email,
        }
        let response = await axios.post('/fetchFromReadingList', queryObject, { headers: { "Content-Type": "application/json", accept: 'application/json' } })
        if (response.statusText === "OK") {
          setReadingList(response.data)
        }
        else {
          console.log("Something went wrong, No Response!")
        }
      }
      catch(error)
      {
        console.error(error);
      }
    }
    fetchReadingList();
  }, [requestData])
  const notifySuccess = () => {
    toast.success('Deleted from Reading List Succesfully', {
      position: "top-left",
      autoClose: 1500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }
  const notifyFailure = () => {
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
  const newsRenderer = readingList && readingList.map((newsElem) => {
    let date = new Date(newsElem.publishedAt)
    const removeClickHandler = async () => {
      let queryObject = {
        email: email,
        title: newsElem.title,
      }
      let response = await axios.post('/deleteFromReadingList', queryObject, { headers: { "Content-Type": "application/json", accept: 'application/json' } })
      if (response.statusText === "OK") {
        setRequestData(new Date());
        notifySuccess();
      }
      else {
        notifyFailure();
      }
    }
    return (
      <div className="container" key={newsElem.title}>
        {(newsElem.urlToImage) ? <img src={newsElem.urlToImage} className="image" alt={newsElem.title} /> : <img alt={newsElem.title} />}
        <div className="centered">
          <p className="text heading">{newsElem.title}</p>
          {(newsElem.author) ? (<p className="text author">Written by <b>{newsElem.author}</b> on {date.toDateString()} at {(date.getHours() < 10 ? '0' : '') + date.getHours()}:{(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()} </p>) : (<p className="text author">Written on {date.toDateString()} at {(date.getHours() < 10 ? '0' : '') + date.getHours()}:{(date.getMinutes() < 10 ? '0' : '') + date.getMinutes()}</p>)}
          <p className="text description">{newsElem.description}</p>
          {(newsElem.sourceName) && <p className="text author">Read more at <a href={newsElem.newsUrl} target="_blank" rel="noreferrer"><b>{newsElem.sourceName}</b></a></p>}
        </div>
        <p className="text description"><IconButton onClick={() => removeClickHandler()}><DeleteOutlineIcon color="error" /></IconButton></p>
      </div>
    );
  }).reverse();
  return (
    <div class="dashboardContainer">
      {(id === null) ?
        <Redirect to="/login" />
        :
        ((readingList.length === 0) ? (<div><Profile /><LoadingDashboard /></div>) : (
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
            <Profile />
            {readingList.length && newsRenderer}
          </div>))}
    </div>

  )

}

