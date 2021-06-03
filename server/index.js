const path = require('path');
const request = require('request');
const express = require('express');
var bodyParser = require('body-parser');
const logger = require('morgan');  
const cors = require('cors');
const PORT = process.env.PORT || 3001;

let options = {json: true};

const app = express();
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false })) 
app.use(express.static(path.resolve(__dirname, '../client/build')));

let query="";
app.get('/news', function(req, res, next) {
    request('https://newsapi.org/v2/top-headlines?country=in&pageSize=100&apiKey=64bdafeb6c6d4018829dfd5ea76bfc9c', options, function(error, response, body) {
        res.send(body)
    });
});
app.get('/businessnews', function(req, res, next) {
  request('https://newsapi.org/v2/top-headlines?country=in&category=business&pageSize=100&apiKey=64bdafeb6c6d4018829dfd5ea76bfc9c', options, function(error, response, body) {
      res.send(body)
  });
});
app.get('/entertainmentnews', function(req, res, next) {
  request('https://newsapi.org/v2/top-headlines?country=in&category=entertainment&pageSize=100&apiKey=64bdafeb6c6d4018829dfd5ea76bfc9c', options, function(error, response, body) {
      res.send(body)
  });
});
app.get('/healthnews', function(req, res, next) {
  request('https://newsapi.org/v2/top-headlines?country=in&category=health&pageSize=100&apiKey=64bdafeb6c6d4018829dfd5ea76bfc9c', options, function(error, response, body) {
      res.send(body)
  });
});
app.get('/sciencenews', function(req, res, next) {
  request('https://newsapi.org/v2/top-headlines?country=in&category=science&pageSize=100&apiKey=64bdafeb6c6d4018829dfd5ea76bfc9c', options, function(error, response, body) {
      res.send(body)
  });
});
app.get('/sportsnews', function(req, res, next) {
  request('https://newsapi.org/v2/top-headlines?country=in&category=sports&pageSize=100&apiKey=64bdafeb6c6d4018829dfd5ea76bfc9c', options, function(error, response, body) {
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
  console.log(query)
  request(`https://newsapi.org/v2/everything?q=${query}&pageSize=100&apiKey=f9fb08a6fe4b409584ed26f296944b4b`, options, function(error, response, body) {
      res.send(body)
  });
});


app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
