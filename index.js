const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.get('/insta_auth', function (req, res) {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

res.send(fullUrl);
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})


//https://api.instagram.com/oauth/authorize/?client_id=c021718dab124c63b99a14039c41438a&redirect_uri=http://localhost:3000/insta_auth&response_type=token