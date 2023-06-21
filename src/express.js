const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const dal = require('./dal');

//used to serve static files from public directory
app.use(express.static(path.join(__dirname, 'build')));
app.use(cors());

//create user account
app.get('/account/create/:name/:email/:password', function(req,res) {
  dal.create(req.params.name, req.params.email, req.params.password)
    .then((user) => {
      console.log(user);
      res.send(user);
    });
});

//login user
app.get('/account/login/:email/:password', function(req,res) {
  dal.login(req.params.email, req.params.password)
    .then((user) => {
      console.log(user);
      res.send(user);
    });
});

//all accounts
app.get('/account/all', function(req,res) {
  dal.all()
    .then((docs) => {
      console.log(docs);
      res.send(docs);
    });
});

//deposit
app.get('/account/deposit/:email/:amount', function(req,res) {
  dal.update(req.params.email, parseInt(req.params.amount))
    .then((balance) => {
      console.log(balance);
      res.send(balance);
    });
});

//withdraw
app.get('/account/withdraw/:email/:amount', function(req,res) {
  dal.update(req.params.email, parseInt(req.params.amount))
    .then((balance) => {
      console.log(balance);
      res.send(balance);
    });
});

const port = 8080;
app.listen(port);
console.log('Running on port ' + port);
