'use strict';

require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');

const { app } = require('../src/server.js');

const request = supergoose(app);

const base64 = require('base-64');