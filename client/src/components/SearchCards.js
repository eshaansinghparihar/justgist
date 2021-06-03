import React ,{ useState } from 'react';
import SearchIcon from '@material-ui/icons/Search';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import axios from 'axios';
import './SearchCards.css';
import NewsCards from './NewsCards';
import Loading from './Loading';
import Error from './Error';
function Search(){
    const [searchnews, setsearchNews]=useState([]);
    const [error,setError]=useState('');
    const [loading,setLoading]=useState(false);
    const [question,setQuestion]=useState('');
    async function sendSearchQueryToAPI(){
        let queryObject={question}
        let response=await axios.post('/sendquery', queryObject , {headers:{"Content-Type" : "application/json",accept: 'application/json'}})
        if(response.data.status==='ok')
        {
        setLoading(false);
        setsearchNews(response.data.articles)
        }
        else
        {
        setLoading(false);
        setError(response.data.message)
        }
    }
      const changeHandler = (e) => {
        setQuestion(e.target.value);
    };
      const clickHandler=()=>{
        setsearchNews([]);
        sendSearchQueryToAPI();
        setLoading(true);
        setQuestion('');
    }
    const clickBackHandler=()=>{
      setsearchNews([]);
  }
      return(
        <div className="App">
            {(error)?
            (
              <Error error={error}/>
            ):((searchnews.length===0)?
            ((loading)?(
              <Loading/>
            ):(
              (
                <div className="divisionsearch">
                 <h2 className="pageheading">Search</h2>
                 <h3 className="subtitle">Search across any article published recently</h3>
                 <div className="number">
                 <input
                     name="search" 
                     value={question}
                     placeholder="Try searching 'Bitcoin' or 'COVID-19' "
                     onChange={e=>changeHandler(e)}
                     className="Input"
                 />
                {(question!=='') && <SearchIcon onClick={clickHandler}/>}
                 </div>
                 </div>
                )
            ))
            :
            (
            <div>
             {(searchnews.length!==0) && <ArrowBackIosIcon onClick={clickBackHandler} fontSize="small"/>}
             {(loading)?
             (<Loading/>):
              (
             <div>
             <h2 className="pageheading">Search</h2>
                 <h3 className="subtitle">Search across any article published recently</h3>
                 <div className="number">
                 <input
                     name="search" 
                     value={question}
                     placeholder="Try searching 'Bitcoin' or 'COVID-19' "
                     onChange={e=>changeHandler(e)}
                     className="Input"
                 />
                  {(question!=='') && <SearchIcon onClick={clickHandler} />}
                 </div>
             <NewsCards data={searchnews} error={error}/>
            </div>)}
            </div>
            ))}
        </div>
      )

}
export default Search;