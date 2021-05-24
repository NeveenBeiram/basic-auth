'use strict';

require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');

const { server } = require('../src/server.js');

const request = supergoose(server);

const base64 = require('base-64');

const superTest = require('supertest');

let otherRequest =superTest (server);


describe ('Error testing', ()=>{
  it ('should throw error 500', async ()=>{
    // arrange 
    let rout = '/bad';
    // act
    const response = await otherRequest.get (rout);
    // assert
    expect(response.status).toEqual (500);
        
  });

  it ('should throw error 404 on a bad method', async ()=>{
    // arrange 
    let rout = '/api/v1/signup';
    // act
    const response = await otherRequest.get (rout);
    // assert
    expect(response.status).toEqual (404);
        
  });


  it ('should throw error 404 on a bad rout', async ()=>{
    // arrange 
    let rout = '/api/v1/s';
    // act
    const response = await otherRequest.get (rout);
    // assert
    expect(response.status).toEqual (404);
        
  });

});

describe ('server.js', ()=>{
  it ('should get the homepage message ', async ()=>{
  // arrange 
    let rout = '/';
    // act
    const response = await otherRequest.get (rout);
    // assert
    expect(response.status).toBe (200);
    expect (response.text).toEqual ('welcome to server.js');

  });
 

});