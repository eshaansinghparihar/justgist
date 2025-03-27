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
function getOptions(request) {
    const userAgent = request.get('user-agent');
    let options = {
        json: true,
        headers: {
            'User-Agent': userAgent
        }
    };
    return options
}


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
const uri = "mongodb+srv://eshaansinghparihar:WkHitDxwKShXfu0q@cluster0.xym0wwo.mongodb.net/?retryWrites=true&w=majority";
try {
    mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
    );
}
catch (err) {
    console.log(err)
}

const connection = mongoose.connection;
connection.once('open', () => {
    try {
        console.log("MongoDB database connection established successfully");
    }
    catch (err) {
        console.log(err)
    }
})


let query = "";
app.use('/auth', authRoutes);

app.get('/news', function (req, res, next) {
    try {
        console.log('GET News Endpoint has been called')
        request('https://newsapi.org/v2/top-headlines?q=india&pageSize=100&apiKey=f9fb08a6fe4b409584ed26f296944b4b', getOptions(req), function (error, response, body) {
            res.send(body)
        });
    }
    catch (err) {
        console.log(err)
    }
});
app.get('/businessnews', function (req, res, next) {
    try {
        console.log('GET Business News Endpoint has been called')
        request('https://newsapi.org/v2/top-headlines?category=business&pageSize=100&apiKey=375a9b5307274bba94cf86101d06c030', getOptions(req), function (error, response, body) {
            res.send(body)
        });
    }
    catch (err) {
        console.log(err)
    }
});
app.get('/entertainmentnews', function (req, res, next) {
    try {
        console.log('GET Entertainment News Endpoint has been called')
        request('https://newsapi.org/v2/top-headlines?category=entertainment&pageSize=100&apiKey=64bdafeb6c6d4018829dfd5ea76bfc9c', getOptions(req), function (error, response, body) {
            res.send(body)
        });
    }
    catch (err) {
        console.log(err)
    }
});
app.get('/healthnews', function (req, res, next) {
    try {
        console.log('GET Health News endpoint has been called')
        request('https://newsapi.org/v2/top-headlines?category=health&pageSize=100&apiKey=06f0790a0cb240d9afc49242b64fbe75', getOptions(req), function (error, response, body) {
            res.send(body)
        });
    }
    catch (err) {
        console.log(err)
    }
});
app.get('/sciencenews', function (req, res, next) {
    try {
        console.log('GET Science News Endpoint has been called')
        request('https://newsapi.org/v2/top-headlines?category=science&pageSize=100&apiKey=f9fb08a6fe4b409584ed26f296944b4b', getOptions(req), function (error, response, body) {
            res.send(body)
        });
    }
    catch (err) {
        console.log(err)
    }
});
app.get('/sportsnews', function (req, res, next) {
    try {
        console.log('GET Sports News Endpoint has been called')
        request('https://newsapi.org/v2/top-headlines?category=sports&pageSize=100&apiKey=06f0790a0cb240d9afc49242b64fbe75', getOptions(req), function (error, response, body) {
            res.send(body)
        });
    }
    catch (err) {
        console.log(err)
    }
});
app.get('/technologynews', function (req, res, next) {
    try {
        console.log('GET Technology News Endpoint has been called')
        request('https://newsapi.org/v2/top-headlines?category=technology&pageSize=100&apiKey=06f0790a0cb240d9afc49242b64fbe75', getOptions(req), function (error, response, body) {
            res.send(body)
        });
    }
    catch (err) {
        console.log(err)
    }
});

app.post('/sendquery', function (req, res) {
    query = req.body.question;
    request(`https://newsapi.org/v2/everything?q=${query}&pageSize=100&apiKey=06f0790a0cb240d9afc49242b64fbe75`, getOptions(req), function (error, response, body) {
        res.send(body)
    });
});

app.post('/addToReadingList', async function (req, res) {
    email = req.body.email;
    title = req.body.title;
    urlToImage = req.body.urlToImage;
    author = req.body.author;
    description = req.body.description;
    newsUrl = req.body.newsUrl;
    publishedAt = req.body.publishedAt;
    sourceName = req.body.sourceName;
    const query = { "email": email };
    const updateDocument = {
        $addToSet: {
            "readingList": {
                "title": title,
                "urlToImage": urlToImage,
                "author": author,
                "description": description,
                "newsUrl": newsUrl,
                "publishedAt": publishedAt,
                "sourceName": sourceName
            }
        }
    };
    try {
        const result = await collectionUsers.updateOne(query, updateDocument);
        res.send(result);
    }
    catch (error) {
        res.send(error)
    }

})

app.post('/fetchMyQuestions', async function (req, res) {
    email = req.body.email;
    const query = { "email": email };
    try {
        const result = await collectionDiscussion.findOne(query);
        res.send(result);
    }
    catch (error) {
        res.send("Something went wrong")
    }

})

app.get('/fetchQuestions', async function (req, res) {
    try {
        const cursor = collectionDiscussion.find({});
        const discussions = await cursor.toArray();
        res.send(discussions);
    }
    catch (error) {
        console.log(error);
        res.send("Something went wrong")
    }

})

app.post('/addQuestionToDiscussions', async function (req, res, next) {
    title = req.body.title;
    description = req.body.title;
    question = req.body.question;
    email = req.body.email;
    author = req.body.author;
    newsUrl = req.body.newsUrl;
    urlToImage = req.body.urlToImage;
    const query = {
        "email": email,
        "title": title,
        "author": author,
        "description": description,
        "question": question,
        "newsUrl": newsUrl,
        "urlToImage": urlToImage
    };
    try {
        const result = await collectionDiscussion.insertOne(query)
        res.send(result);
    }
    catch (error) {
        res.send("Something went wrong");
    }

});
app.post('/fetchFromReadingList', async function (req, res, next) {
    email = req.body.email;
    try {
        const result = await collectionUsers.findOne({ "email": email });
        res.send(result.readingList);
    }
    catch (error) {
        res.send(error);
    }

});
app.post('/deleteFromReadingList', async function (req, res) {
    email = req.body.email;
    title = req.body.title;
    try {
        const query = { "email": email };
        const updateDocument = {
            $pull: {
                "readingList": {
                    "title": title
                }
            }
        };
        const result = await collectionUsers.updateOne(query, updateDocument, { safe: true });
        res.send(result);
    }
    catch (error) {
        res.send(error)
    }

})

app.post('/addReply', async function (req, res) {
    email = req.body.email;
    title = req.body.title;
    nameOfUser = req.body.name;
    description = req.body.description;
    question = req.body.question;
    reply = req.body.reply;
    const query = { "title": title, "description": description, "question": question };
    const updateDocument = {
        $addToSet: {
            "replies": {
                "reply": reply,
                "name": nameOfUser,
                "email": email,
            }
        }
    };
    try {
        const result = await collectionDiscussion.updateOne(query, updateDocument);
        res.send(result);
    }
    catch (error) {
        res.send(error)
    }

})
app.post('/deleteReply', async function (req, res) {
    email = req.body.email;
    reply = req.body.reply;
    title = req.body.title;
    question = req.body.question;
    try {
        const query = { "title": title, "question": question };
        const updateDocument = {
            $pull: {
                "replies": {
                    "reply": reply,
                    "email": email
                }
            }
        };
        const result = await collectionDiscussion.updateOne(query, updateDocument, { safe: true });
        res.send(result);
    }
    catch (error) {
        res.send(error)
    }

})

app.post('/deleteQuestion', async function (req, res) {
    email = req.body.email;
    title = req.body.title;
    try {
        const query = { "email": email, "title": title };
        const result = await collectionDiscussion.findOneAndDelete(query);
        res.send(result);
    }
    catch (error) {
        res.send(error)
    }

})

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client/build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});
