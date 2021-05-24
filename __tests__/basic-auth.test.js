'use strict';

require('dotenv').config();
const supergoose = require('@code-fellows/supergoose');

const { server}  = require('../src/server.js');

const request = supergoose(server);

const base64 = require('base-64');



let user={
  username: 'nev',
  password: '123',
};

describe('authentication test', () => {

  it('should create a new User on POST /signup', async () => {
    const response = await request.post('/api/v1/signup').send(user);
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('nev');
  });


  it('Sign In test',async ()=>{
  
    const user = base64.encode('nev:123');
    const response1 = await request.post('/api/v1/signin').set('Authorization', `Basic ${user}`);
    expect(response1.status).toEqual(201);
    expect(response1.body.username).toEqual('nev');
    expect(response1.body.password).not.toEqual('123');
  });
  
});


describe('api server test', () => {
  it('Home page test', async () => {
    const response = await request.get('/');
    expect(response.status).toEqual(200);
  });

  it ('should throw an error while adding a new user with missing required data', async ()=>{
    // arrange 
    let user = {
      username : 'ne',
    };
      // act
    const response = await request.post('/api/v1/signup').send(user);
    // assert
    expect(response.status).toEqual(403);
    
  });

  it('Test wrong password', async () => {
    const response = await request
      .post('/api/v1/signin')
      .set(
        'Authorization','basic ' + new Buffer.from(`${user.username}:${1234}`, 'utf8').toString('base64'),
      );
    expect(response.status).toEqual(500);
  });

  it('Test wrong username', async () => {
    const response = await request
      .post('/api/v1/signin')
      .set(
        'Authorization','basic ' + new Buffer.from(`noo: ${user.password}`, 'utf8').toString('base64'),
      );
    expect(response.status).toEqual(500);
  });

});