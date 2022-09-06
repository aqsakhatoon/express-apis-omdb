require('dotenv').config();
const express = require('express');
const ejsLayouts = require('express-ejs-layouts');
const app = express();
const axios = require('axios')

// Sets EJS as the view engine
app.set('view engine', 'ejs');
// Specifies the location of the static assets folder
app.use(express.static('static'));
// Sets up body-parser for parsing form data
app.use(express.urlencoded({ extended: false }));
// Enables EJS Layouts middleware
app.use(ejsLayouts);

// Adds some logging to each request
app.use(require('morgan')('dev'));
console.log('process.env:', processs.env.API_KEY)
// http://www.omdbapi.com/?i=tt3896198&apikey=6abed851

// Routes
app.get('/', function(req, res) {
  res.render('index.ejs');
});

app.get('/search', async (req, res) => {
  const url = `http://www.omdbapi.com/?i=tt3896198&apikey=6abed851${process.env.API_KEY}`;
  axios.get(url).then(response =>
    {
      res.render("results.ejs", {
        searchResults: response.data.results,
        searchInput: req.query.userInput
      });
    })
})

// The app.listen function returns a server handle
var server = app.listen(process.env.PORT || 3000);

// We can export this server to other servers like this
module.exports = server;
