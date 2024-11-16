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

//register route to render failed page 
app.get('/failed', function(req, res) {
    res.render('pages/failed');
  });

  //register route to render logout page
  app.get('/logout', function(req, res) {
    res.render('pages/logout');
  });

const port = process.env.PORT || 4000;
app.listen(port , () => console.log('App listening on port ' + port));
const clientID = 'YOUR_GITHUB_CLIENT_ID_HERE'
const clientSecret = 'YOUR_GITHUB_CLIENT_SECRET_HERE'

app.get('/home', (req, res) => {
  //if user denies access to github account display login  failed page. 
  if(req.query.error=="access_denied"){
    res.redirect('/failed');
    return;
}
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
