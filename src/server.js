'use strict';

const express = require('express');
const app = express();
const cors = require('cors');

const  routes =require('./auth/router');

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));


app.use ('/api/v1/', routes);




const notFoundHandler = require('./middleware/404');
const errorHandler = require('./middleware/500');

app.get('/', home);
app.get('/bad', badReq);

function home(req,res){
  res.send('welcome to server.js');
}
function badReq(req, res) {
  throw new Error('Something went wrong !!!!!');
}

app.use('*', notFoundHandler);
app.use(errorHandler);

module.exports = {
  server: app,
  start: (port) => {
    const PORT = port || 3000;
    app.listen(PORT, () => console.log(`server is listening on port ${PORT}`));
  },
};