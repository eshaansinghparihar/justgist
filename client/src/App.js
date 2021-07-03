import React ,{useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter, Switch,Route,Redirect } from 'react-router-dom';
import NewsCards from './components/NewsCards';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Navigation from './components/Navigation';
import SearchCards from './components/SearchCards';
import Dashboard from './components/Dashboard';

export default function App() {
  
  const [news, setNews]=useState([]);
  const [businessnews, setbusinessNews]=useState([]);
  const [entertainmentnews, setentertainmentNews]=useState([]);
  const [healthnews, sethealthNews]=useState([]);
  const [sciencenews, setscienceNews]=useState([]);
  const [sportsnews, setsportsNews]=useState([]);
  const [technologynews, settechnologyNews]=useState([]);
  const [error,setError]=useState('');
  const [businesserror,setBusinessError]=useState('');
  const [entertainmenterror,setEntertainmentError]=useState('');
  const [healtherror,setHealthError]=useState('');
  const [scienceerror,setScienceError]=useState('');
  const [sportserror,setSportsError]=useState('');
  const [technologyerror,setTechnologyError]=useState('');
  function callNewsAPI(){
        fetch("/news")
        .then(res => res.json())
        .then(res => {
          if(res.status==='ok')
        {
          setError('');
          setNews(res.articles)
        }
        else
        {
          setError(res.message)
        }
        });
  }
  function callBusinessNewsAPI(){
    fetch("/businessnews")
    .then(res => res.json())
    .then(res => {
      if(res.status==='ok')
    {
      setBusinessError('')
      setbusinessNews(res.articles)
    }
    else
    {
      setBusinessError(res.message)
    }
    });
}
function callEntertainmentNewsAPI(){
  fetch("/entertainmentnews")
  .then(res => res.json())
  .then(res => {
    if(res.status==='ok')
  {
    setEntertainmentError('')
    setentertainmentNews(res.articles)
  }
  else
  {
    setEntertainmentError(res.message)
  }
  });
}
function callHealthNewsAPI(){
  fetch("/healthnews")
  .then(res => res.json())
  .then(res => {
    if(res.status==='ok')
  {
    setHealthError('')
    sethealthNews(res.articles)
  }
  else
  {
    setHealthError(res.message)
  }
  });
}
function callSportsNewsAPI(){
  fetch("/sportsnews")
  .then(res => res.json())
  .then(res => {
    if(res.status==='ok')
  {
    setSportsError('')
    setsportsNews(res.articles)
  }
  else
  {
    setSportsError(res.message)
  }
  });
}
function callScienceNewsAPI(){
  fetch("/sciencenews")
  .then(res => res.json())
  .then(res => {
    if(res.status==='ok')
  {
    setScienceError('')
    setscienceNews(res.articles)
  }
  else
  {
    setScienceError(res.message)
  }
  });
}
function callTechnologyNewsAPI(){
  fetch("/technologynews")
  .then(res => res.json())
  .then(res => {
    if(res.status==='ok')
  {
    setTechnologyError('')
    settechnologyNews(res.articles)
  }
  else
  {
    setTechnologyError(res.message)
  }
  });
}

  useEffect(()=>{
    callNewsAPI();
    callBusinessNewsAPI();
    callHealthNewsAPI();
    callEntertainmentNewsAPI();
    callScienceNewsAPI();
    callSportsNewsAPI();
    callTechnologyNewsAPI();
  },[]);
  return (
  <BrowserRouter>
  <div>
  <div className="float">
  <Navigation/>
  </div>
      <Switch>
      <Route exact path="/" >
      <NewsCards data={news} error={error}/>
      </Route>
      <Route exact path="/login" >
      <Signin />
      </Route>
      <Route exact path="/signup" >
      <Signup/>
      </Route>
      <Route exact path="/dashboard" >
      <Dashboard/>
      </Route>
      <Route exact path="/search" >
      <SearchCards />
      </Route>
      <Route exact path="/business" >
      <NewsCards data={businessnews} error={businesserror}/>
      </Route>
      <Route exact path="/entertainment" >
      <NewsCards data={entertainmentnews} error={entertainmenterror}/>
      </Route>
      <Route exact path="/health" >
      <NewsCards data={healthnews} error={healtherror}/>
      </Route>
      <Route exact path="/science" >
      <NewsCards data={sciencenews} error={scienceerror}/>
      </Route>
      <Route exact path="/sports" >
      <NewsCards data={sportsnews} error={sportserror}/>
      </Route>
      <Route exact path="/technology" >
      <NewsCards data={technologynews} error={technologyerror}/>
      </Route>
      <Redirect to="/" />
  </Switch>
  </div>
  </BrowserRouter>
  );
}

