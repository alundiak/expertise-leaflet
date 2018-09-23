var express = require('express')
var path = require('path')
var app = express()
var cors = require('cors')
var dotenv = require('dotenv').config() // for usage env file as extension to process.env variables
var ClientOAuth2 = require('client-oauth2')

var githubAuth = new ClientOAuth2({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    accessTokenUri: 'https://github.com/login/oauth/access_token',
    authorizationUri: 'https://github.com/login/oauth/authorize',
    // redirectUri: 'https://behind-the-code.herokuapp.com/auth/github/callback',
    // scopes: ['user', 'repo', 'public_repo'] // (no scope) - public read-only access (includes user profile info, public repo info, and gists).
})

app.set('port', (process.env.PORT || 5000)); // process.env.PORT is for Heroku instance

app.use(express.static(__dirname + '/'));

app.get('/', function(request, response) {
    response.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
