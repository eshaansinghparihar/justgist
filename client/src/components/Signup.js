import React ,{  Component }from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import { Link } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import Typography from '@material-ui/core/Typography';
import { withStyles } from "@material-ui/core/styles";

const styles = (theme) => ({
  paper: {
        margin: theme.spacing(8, 4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
  avatar: {
    margin: theme.spacing(2),
    backgroundColor: theme.palette.primary.light,
  },
  form: {
    // width: '100vh'
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(8),
    height:'85vh',
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
        backgroundImage: 'url(https://source.unsplash.com/1600x900/?newspaper,news)',
        backgroundRepeat: 'no-repeat',
        backgroundColor:
          theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
});

class Signup extends Component{
  constructor(props){
    super(props);
    this.state={
      user:{},
      errors:[],
      success:""
    }
    this.handleSubmit=this.handleSubmit.bind(this);
  }
   handleSubmit=(e)=>{
    e.preventDefault();
    this.setState({success:""})
    this.setState({errors:[]})
    let queryObject=this.state.user
    axios.post('http://localhost:3001/auth/signup', queryObject , {headers:{"Content-Type" : "application/json",accept: 'application/json'}})
    .then(response=>{
      if(response.data.success)
        {
        this.setState({success:"Account Creation Successful"})
        }})
    .catch(err=>{
      if(err.response)
      {
        this.setState({errors:err.response.data.errors})
      }
    })
  }
  render(){
    const { classes } = this.props;
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <PersonAddIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
          {`Hello There ,\n Register Yourself Here`}
          </Typography>
          <form className={classes.form} noValidate onSubmit={this.handleSubmit}>
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="displayName"
              label="Full Name"
              name="displayName"
              autoComplete="name"
              autoFocus
              value={this.state.user.name}
              onInput={ e=>{this.setState({user:{...this.state.user,name:e.target.value}})}}
            />
          <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              value={this.state.user.email}
              onInput={ e=>{this.setState({user:{...this.state.user,email:e.target.value}})}}
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
              value={this.state.user.password}
              onInput={ e=>{this.setState({user:{...this.state.user,password:e.target.value}})}}
            />
            {this.state.errors ? this.state.errors.map(error=>{
              return(
                <Typography component="h5" variant="h6" color="error">
                  {error}
                </Typography>
              )
            }) : ''}
            {this.state.success ? (
                <Typography component="h5" variant="h6" color="primary">
                  {this.state.success}
                </Typography>
              ) : ''}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="secondary"
              className={classes.submit}
            >
             Sign Up
            </Button>
            <Grid container>
              <Grid item>
                <Link to="/login" activeClassName="current">
                  {"Already have an account!  SignIn here"}
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
  
}
export default withStyles(styles, { withTheme: true })(Signup);