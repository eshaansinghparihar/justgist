import React , { useState,useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Paper ,Container, CssBaseline, CardContent ,Avatar, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import NetworkCheckIcon from '@material-ui/icons/NetworkCheck';
const useStyles= makeStyles((theme)=>({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(16),
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
  },
  avatar: {
    marginTop: theme.spacing(3),
    backgroundColor: theme.palette.secondary.light,
    marginLeft:'auto',
    marginRight:'auto',
    marginBottom: theme.spacing(3),
    },
    subtitle1:{
        marginLeft:'auto',
        marginRight:'auto'
    }
}))

function Loading() {
  const classes = useStyles();
  const [loading,setLoading]=useState(true);
  useEffect(() => {
    setTimeout(
        () => setLoading(false), 
        12000
      );
   },[]);
  let history = useHistory();
  const goToPreviousPath = () => {
        history.goBack()
    }
  return (
    (loading)?
    (<div className={classes.container}>
      <CircularProgress color="secondary"/>
    </div>):
    (<div className={classes.container}>
        <Container component="main">
        <CssBaseline />
        <Paper item alignContent="center" spacing={2} elevation={8}>
        <div  className={classes.nodata}>
        <CardContent>
        <ArrowBackIosIcon onClick={goToPreviousPath} color="secondary" fontSize="small"/>
        <Avatar className={classes.avatar}>
        <NetworkCheckIcon fontSize="large"/>
        </Avatar>
        <Typography component="h3" variant="subtitle1">It's not you, It's us</Typography>
        <Typography component="h3" variant="subtitle1">Looks like we lost our way.</Typography>
        </CardContent>
        </div>
        </Paper>
        </Container>
    </div>)
  );
}

export default Loading;