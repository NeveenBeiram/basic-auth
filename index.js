'use strict';

const server = require('./src/server.js');
require('dotenv').config();

const PORT = process.env.PORT || 3030 ;

const mongoose = require('mongoose');


mongoose
  .connect(process.env.MONGOOSE_URI,
    { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    server.start(PORT);
  })
  .catch((e) => {
    console.log('CONNECTION_ERROR', e.massage);
  });