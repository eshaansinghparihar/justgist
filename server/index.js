require('dotenv').config();
const path = require('path');
const request = require('request');
const express = require('express');
const logger = require('morgan');  
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth');
// const { db, collection } = require('./models/User');

const collectionUsers = require('./models/User').collection;
const collectionDiscussion = require('./models/Discussion').collection;

const PORT = process.env.PORT || 3001;

let options = {json: true};

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })) 
app.use(express.static(path.resolve(__dirname, '../client/build')));

const uri = "mongodb+srv://eshaansinghparihar:3yqDEVsbFUF2w0ub@cluster0.kay5k.mongodb.net/Database0?retryWrites=true&w=majority";
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true , useUnifiedTopology: true}
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("Database connection established successfully");
})


let query="";
app.use('/auth', authRoutes);

app.get('/news', function(req, res, next) {
    request('https://newsapi.org/v2/top-headlines?country=in&pageSize=100&apiKey=f9fb08a6fe4b409584ed26f296944b4b', options, function(error, response, body) {
        res.send(body)
    });
});
app.get('/businessnews', function(req, res, next) {
  request('https://newsapi.org/v2/top-headlines?country=in&category=business&pageSize=100&apiKey=375a9b5307274bba94cf86101d06c030', options, function(error, response, body) {
      res.send(body)
  });
});
app.get('/entertainmentnews', function(req, res, next) {
  request('https://newsapi.org/v2/top-headlines?country=in&category=entertainment&pageSize=100&apiKey=64bdafeb6c6d4018829dfd5ea76bfc9c', options, function(error, response, body) {
      res.send(body)
  });
});
app.get('/healthnews', function(req, res, next) {
  request('https://newsapi.org/v2/top-headlines?country=in&category=health&pageSize=100&apiKey=06f0790a0cb240d9afc49242b64fbe75', options, function(error, response, body) {
      res.send(body)
  });
});
app.get('/sciencenews', function(req, res, next) {
  request('https://newsapi.org/v2/top-headlines?country=in&category=science&pageSize=100&apiKey=f9fb08a6fe4b409584ed26f296944b4b', options, function(error, response, body) {
      res.send(body)
  });
});
app.get('/sportsnews', function(req, res, next) {
  request('https://newsapi.org/v2/top-headlines?country=in&category=sports&pageSize=100&apiKey=375a9b5307274bba94cf86101d06c030', options, function(error, response, body) {
      res.send(body)
  });
});
app.get('/technologynews', function(req, res, next) {
  request('https://newsapi.org/v2/top-headlines?country=in&category=technology&pageSize=100&apiKey=64bdafeb6c6d4018829dfd5ea76bfc9c', options, function(error, response, body) {
      res.send(body)
  });
});

app.post('/sendquery', function(req, res) {
  query=req.body.question;
  request(`https://newsapi.org/v2/everything?q=${query}&pageSize=100&apiKey=06f0790a0cb240d9afc49242b64fbe75`, options, function(error, response, body) {
      res.send(body)
  });
});

app.post('/addToReadingList',async function(req, res) {
  email=req.body.email;
  title=req.body.title;
  urlToImage=req.body.urlToImage;
  author=req.body.author;
  description=req.body.description;
  newsUrl=req.body.newsUrl;
  publishedAt=req.body.publishedAt;
  sourceName=req.body.sourceName;
  const query = { "email":email };
  const updateDocument = {
    $addToSet: { "readingList": {
      "title":title,
      "urlToImage":urlToImage,
      "author":author,
      "description":description,
      "newsUrl":newsUrl,
      "publishedAt":publishedAt,
      "sourceName":sourceName
    }
  }
  };
  try{
    const result = await collectionUsers.updateOne(query, updateDocument );
    res.send(result);
  }
  catch(error){
    res.send(error)
  }

})

app.post('/fetchMyQuestions',async function(req, res) {
  email=req.body.email;
  const query = { "email":email };
  try{
    const result = await collectionUsers.findOne(query );
    console.log(result);
    res.send(result);
  }
  catch(error){
    res.send("Something went wrong")
  }

})

app.post('/addQuestionToDiscussions', async function(req, res, next) {
      title=req.body.title;
      description=req.body.title;
      question=req.body.question;
      email=req.body.email;
      author=req.body.author;
      newsUrl=req.body.newsUrl;
      urlToImage=req.body.urlToImage;
      const query = { "email":email,
      "title":title,
      "author":author,
      "description":description,
      "question":question,
      "newsUrl":newsUrl,
      "urlToImage":urlToImage };
      try
      {
        const result=await collectionDiscussion.insertOne( query )
        res.send(result);
      }
      catch(error){
        res.send("Something went wrong");
      }
  
});

app.post('/deleteFromReadingList',async function(req, res) {
  email=req.body.email;
  title=req.body.title;
  try{
      const query = { "email":email };
      const updateDocument = {
        $pull: { "readingList": {
          "title":title
        }
      }
      };
      const result = await collectionUsers.updateOne(query, updateDocument , { safe: true } );
      res.send(result);
    }
  catch(error){
    res.send(error)
  }

})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
