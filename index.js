/*  EXPRESS */
// import express framework 
const express = require('express');
const app = express();
// import axios network library for http calls 

const axios = require('axios')

app.set('view engine', 'ejs');
var access_token = "";

app.get('/', function(req, res) {
  res.render('pages/index',{client_id: clientID});

});

const port = process.env.PORT || 4000;
app.listen(port , () => console.log('App listening on port ' + port));
const clientID = '287c92f168eb5b9dbbb5'
const clientSecret = '05c8d0c123ff58583ce629bf80d95010ab5e61ac'

app.get('/home', (req, res) => {
  const requestToken = req.query.code
  axios({
    method: 'post',
    url: `https://github.com/login/oauth/access_token?client_id=${clientID}&client_secret=${clientSecret}&code=${requestToken}`,
    headers: {
         accept: 'application/json'
    }
  }).then((response) => {
    access_token = response.data.access_token
    res.redirect('/success');
  })
})

app.get('/success', function(req, res) {

  axios({
    method: 'get',
    url: `https://api.github.com/user`,
    
    headers: {
      Authorization: 'token ' + access_token
    }
  }).then((response) => {
    
    res.render('pages/success',{ userData: response.data });
  })
});