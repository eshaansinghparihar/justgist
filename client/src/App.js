import React ,{useState, useEffect} from 'react';
import './App.css';
import { BrowserRouter, Switch,Route,Redirect } from 'react-router-dom';
import NewsCards from './components/NewsCards';
import Navigation from './components/Navigation';
import SearchCards from './components/SearchCards';
export default function App() {
  const [news, setNews]=useState([]);
  const [businessnews, setbusinessNews]=useState([]);
  const [entertainmentnews, setentertainmentNews]=useState([]);
  const [healthnews, sethealthNews]=useState([]);
  const [sciencenews, setscienceNews]=useState([]);
  const [sportsnews, setsportsNews]=useState([]);
  const [technologynews, settechnologyNews]=useState([]);
  const [error,setError]=useState('');
  function callNewsAPI(){
        fetch("/news")
        .then(res => res.json())
        .then(res => {
          if(res.status==='ok')
        {
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
      setbusinessNews(res.articles)
    }
    else
    {
      setError(res.message)
    }
    });
}
function callEntertainmentNewsAPI(){
  fetch("/entertainmentnews")
  .then(res => res.json())
  .then(res => {
    if(res.status==='ok')
  {
    setentertainmentNews(res.articles)
  }
  else
  {
    setError(res.message)
  }
  });
}
function callHealthNewsAPI(){
  fetch("/healthnews")
  .then(res => res.json())
  .then(res => {
    if(res.status==='ok')
  {
    sethealthNews(res.articles)
  }
  else
  {
    setError(res.message)
  }
  });
}
function callSportsNewsAPI(){
  fetch("/sportsnews")
  .then(res => res.json())
  .then(res => {
    if(res.status==='ok')
  {
    setsportsNews(res.articles)
  }
  else
  {
    setError(res.message)
  }
  });
}
function callScienceNewsAPI(){
  fetch("/sciencenews")
  .then(res => res.json())
  .then(res => {
    if(res.status==='ok')
  {
    setscienceNews(res.articles)
  }
  else
  {
    setError(res.message)
  }
  });
}
function callTechnologyNewsAPI(){
  fetch("/technologynews")
  .then(res => res.json())
  .then(res => {
    if(res.status==='ok')
  {
    settechnologyNews(res.articles)
  }
  else
  {
    setError(res.message)
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
  <Navigation />
  <Switch>
      <Route exact path="/" >
      <NewsCards data={news} error={error}/>
      </Route>
      <Route exact path="/search" >
      <SearchCards />
      </Route>
      <Route exact path="/business" >
      <NewsCards data={businessnews} error={error}/>
      </Route>
      <Route exact path="/entertainment" >
      <NewsCards data={entertainmentnews} error={error}/>
      </Route>
      <Route exact path="/health" >
      <NewsCards data={healthnews} error={error}/>
      </Route>
      <Route exact path="/science" >
      <NewsCards data={sciencenews} error={error}/>
      </Route>
      <Route exact path="/sports" >
      <NewsCards data={sportsnews} error={error}/>
      </Route>
      <Route exact path="/technology" >
      <NewsCards data={technologynews} error={error}/>
      </Route>
      <Redirect to="/" />
  </Switch>
  </div>
  </BrowserRouter>
  );
}

