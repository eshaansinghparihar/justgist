import React ,{useState, useEffect} from 'react';
import './App.css';
import NewsCards from './components/NewsCards';

export default function App() {
  const [news, setNews]=useState([]);
  const [businessnews, setbusinessNews]=useState([]);
  const [entertainmentnews, setentertainmentNews]=useState([]);
  const [healthnews, sethealthNews]=useState([]);
  const [sciencenews, setscienceNews]=useState([]);
  const [sportsnews, setsportsNews]=useState([]);
  const [technologynews, settechnologyNews]=useState([]);
  const [error,setError]=useState('No Error, Status OK');
  var url;
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
  useEffect(()=>{
    callNewsAPI();
  },[]);

  return (
    <div>
  <h2>{error}</h2>
  <h2>News</h2>
  <NewsCards data={news}/>
  <h2>Business News</h2>
  <NewsCards data={businessnews}/>
  <h2>Entertainment News</h2>
  <NewsCards data={entertainmentnews}/>
  <h2>Health News</h2>
  <NewsCards data={healthnews}/>
  <h2>Science News</h2>
  <NewsCards data={sciencenews}/>
  <h2>Sports News</h2>
  <NewsCards data={sportsnews}/>
  <h2>Technology News</h2>
  <NewsCards data={technologynews}/>
  </div>
  );
}

