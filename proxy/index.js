const express = require('express');
var cors = require('cors');
var fetch = require('node-fetch');
// const { createProxyMiddleware } = require('http-proxy-middleware');

// https://a.4cdn.org/

const app = express();
const port = 5000;

// Fuck I hate cors
app.options('*', cors());

var mem = {};

app.get('/4chan/*', (req, res) => {
  var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;

  var newUrl = req.originalUrl.replace('/4chan/', 'https://a.4cdn.org/');
  console.log('requesting', { newUrl });

  var send = (r) => {
    console.log('sending');
    // god damn fuck cors
    res.set('Origin', '*');
    res.set('Access-Control-Allow-Origin', '*');
    res.set('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.set(
      'Access-Control-Allow-Headers',
      'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
    );
    res.set('Referrer-Policy', 'no-referrer');

    res.json(r);
  };

  if (mem[newUrl]) {
    console.log('sending from cache');
    send(mem[newUrl]);
    return;
  }
  fetch(req.originalUrl.replace('/4chan/', 'https://a.4cdn.org/'))
    .then((r) => {
      console.log(r.status);
      return r.json();
    })
    .then((r) => {
      mem[newUrl] = r;
      console.log('sending fresh');
    })
    .then((r) => send(mem[newUrl]));
});

app.listen(port, () => {
  console.log(`Backend proxy listening at http://127.0.0.1:${port}`);
});
