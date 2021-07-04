import React ,{ useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { Link , useHistory } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
      },
  paper: {
    margin: theme.spacing(8 , 4),
    display: 'flex',
    minHeight:'100vh',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(8),
  },
  submit: {
    background: 'linear-gradient(45deg, #F7971E 30%,#FFD200 110%)',
    borderRadius: 20,
    margin:theme.spacing(1),
    marginLeft:'auto',
    marginRight:'auto',
    width:'100%',
    color:'white',
    marginBottom:'5px'
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/1600x900/?devices)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
}));

export default function SignIn() {
  const history = useHistory();
  const classes = useStyles();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState([]);
  const handleSubmit=async (e)=>{
    e.preventDefault();
    setError([]);
    let queryObject={
      email:email,
      password:password
    }
    await axios.post('http://localhost:3001/auth/signin',queryObject , {headers:{"Content-Type" : "application/json",accept: 'application/json'}})
    .then(response=>{
      if(response.data.success)
        {
          localStorage.setItem("user_id", response.data.message._id)
          localStorage.setItem("user_name", response.data.message.name)
          localStorage.setItem("user_email", response.data.message.email)
          history.push("/");
        }})
    .catch(err=>{
      if(err.response)
      {
        setError(err.response.data.errors)
      }
    })

  }
  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
        Hello Again , Welcome Back
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={email}
            onInput={ e=>setEmail(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onInput={ e=>setPassword(e.target.value)}
          />
          <Typography component="h5" variant="h6" color="error">
          {error ? error : ''}
          </Typography>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
           Sign in
          </Button>
          <Grid container>
            <Grid item>
              <Link to="/signup" activeClassName="current">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      </Grid>
      <Grid item xs={false} sm={2} md={3} className={classes.image} />
    </Grid>
  );
}