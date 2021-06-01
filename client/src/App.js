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
  const [error,setError]=useState('');
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
  <h2>News</h2>
  <NewsCards data={news} error={error}/>
  </div>
  );
}

