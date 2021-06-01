const path = require('path');
const express = require("express");
var request = require('request');
let options = {json: true};
const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.static(path.resolve(__dirname, '../client/build')));

app.get('/news', function(req, res, next) {
    request('https://newsapi.org/v2/top-headlines?country=in&pageSize=100&apiKey=64bdafeb6c6d4018829dfd5ea76bfc9c', options, function(error, response, body) {
        res.send(body)
    });
});

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
  });

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
