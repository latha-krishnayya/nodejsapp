console.log("may server.js be with you");

const express = require('express');
const res = require('express/lib/response');
const app = express();
const bodyParser= require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const connectionString = 'mongodb://localhost:27017/myapp';


MongoClient.connect(connectionString, { useUnifiedTopology: true })
  .then(client => {
    console.log('Connected to Database');
    const db = client.db('star-war-quotes');
    const quotesCollection = db.collection('quotes');

    app.set('view engine', 'ejs');
    app.use(bodyParser.urlencoded({ extended: true }))

    app.listen(3000, function() {
      console.log('listening on 3000')
    })

    app.get('/', (req, res) => {
      const cursor = db.collection('quotes').find().toArray().then(results => {
        res.render('index.ejs', {quotes: results});
      }).catch(error => console.error(error))

      
    })  

    app.post('/quotes', (req, res) => {
      quotesCollection.insertOne(req.body)
        .then(result => {
          res.redirect('/');
        })
        .catch(error => console.error(error))
    })

})
  .catch(error => console.error(error))

