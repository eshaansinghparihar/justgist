import React, {useEffect, useState} from 'react';
import '../App.css';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import {AppBar,Toolbar,IconButton,MenuList,MenuItem,ListItemText ,Drawer} from '@material-ui/core/';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { makeStyles  , useTheme} from '@material-ui/core/styles';
const drawerWidth = '40vh';
const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
      },
      appBar: {
        background:'#8d1c55',
        zIndex:theme.spacing(1),
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
      },
      appBarShift: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['margin', 'width'], {
          easing: theme.transitions.easing.easeOut,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
      menuButton: {
        marginRight: theme.spacing(2),
      },
      hide: {
        display: 'none',
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      },
}));

export default function App() {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState('/');
  const [auth,setAuth]=useState("");
  const handleDrawerClose=()=>{
    setOpen(false);
  }
  const handleDrawerOpen=()=>{
    setOpen(true);
  }
  useEffect(()=>{
    setLocation(window.location.pathname);
    const auth=localStorage.getItem("user_id");
    setAuth(auth);
  })
  const activeRoute = (routeName) => {
    return location === routeName ? true : false ;
  }
return(
<div>
<AppBar position="static" style={{ zIndex: 1251 }} className={classes.appBar}>
<Toolbar>
<IconButton
    color="inherit"
    aria-label="open drawer"
    onClick={handleDrawerOpen}
    edge="start"
    className={clsx(classes.menuButton, open && classes.hide)}
  >
    <MenuIcon />
  </IconButton>
  <p className="heading">
    justGist
  </p>
</Toolbar>
</AppBar>
<Drawer
className={classes.drawer}
variant="persistent"
anchor="left"
open={open}
classes={{
  paper: classes.drawerPaper,
}}
style={{ zIndex: 1250 }}
>
<div className={classes.drawerHeader}>
<IconButton onClick={handleDrawerClose}>
{theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
</IconButton>
</div>
<MenuList>

{(auth===null)?(<Link to="/login" style={{ textDecoration: 'none' }} >
<MenuItem onClick={handleDrawerClose} selected={activeRoute("/login")}>
<ListItemText secondary="Login" className="heading"/> 
</MenuItem>
</Link>):''}

{( auth!==null)?(<Link to="/dashboard" style={{ textDecoration: 'none' }} >
<MenuItem onClick={handleDrawerClose} selected={activeRoute("/dashboard")}>
<ListItemText secondary="Reading List" className="heading"/>
</MenuItem>
</Link>):''}

{( auth!==null)?(<Link to="/discussions" style={{ textDecoration: 'none' }} >
<MenuItem onClick={handleDrawerClose} selected={activeRoute("/discussions")}>
<ListItemText secondary="Discussions" className="heading"/>
</MenuItem>
</Link>):''}

<Link to="/search" style={{ textDecoration: 'none' }} >
<MenuItem onClick={handleDrawerClose} selected={activeRoute("/search")}>
<ListItemText secondary="Search" className="heading"/> 
</MenuItem>
</Link>

<Link to="/" style={{ textDecoration: 'none' }} >
<MenuItem onClick={handleDrawerClose} selected={activeRoute("/")}>
<ListItemText secondary="Home" className="heading"/> 
</MenuItem>
</Link>

<Link to="/business" style={{ textDecoration: 'none' }} >
<MenuItem onClick={handleDrawerClose} selected={activeRoute("/business")}>
<ListItemText secondary="Business" className="heading"/> 
</MenuItem>
</Link>


<Link to="/entertainment" style={{ textDecoration: 'none' }} >
<MenuItem onClick={handleDrawerClose} selected={activeRoute("/entertainment")}>
<ListItemText secondary="Entertainment" className="heading"/> 
</MenuItem>
</Link>


<Link to="/health" style={{ textDecoration: 'none' }} >
<MenuItem onClick={handleDrawerClose} selected={activeRoute("/health")}>
<ListItemText secondary="Health" className="heading"/> 
</MenuItem>
</Link>


<Link to="/science" style={{ textDecoration: 'none' }} >
<MenuItem onClick={handleDrawerClose} selected={activeRoute("/science")}>
<ListItemText secondary="Science" /> 
</MenuItem>
</Link>


<Link to="/sports" style={{ textDecoration: 'none' }} >
<MenuItem onClick={handleDrawerClose} selected={activeRoute("/sports")}>
<ListItemText secondary="Sports" /> 
</MenuItem>
</Link>

<Link to="/technology" style={{ textDecoration: 'none' }} >
<MenuItem onClick={handleDrawerClose} selected={activeRoute("/technology")}>
<ListItemText secondary="Technology" /> 
</MenuItem>
</Link>

</MenuList>
</Drawer>
</div>
  );
}

