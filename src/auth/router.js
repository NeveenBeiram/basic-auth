'use strict';

const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

// const basicAuth = require('./middleware/basic.js');
const User = require('./models/user.model');

const signInAuth=require('../auth/middleware/basic');

router.post('/signup', signupHandler);
router.post('/signin' ,signInAuth,signInHandler);


async function signupHandler(req,res){
  try {
    const {username, password} = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = new User({ username , password: hash });
    const record = await user.save();
    res.status(201).json(record);              
  } catch (error) {
    res.status(403).send('Error User is not created');        
  }
}




async function signInHandler(req,res){
  res.status(201).json(req.user);
}
  
  
module.exports = router;
