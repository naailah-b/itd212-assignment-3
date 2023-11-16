var express = require('express');
var parser = require('body-parser');
var path = require('path');
var app = express();

var MongoClient = require('mongodb').MongoClient;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Originm X-Requested-With, Content-Type, Accept");
  next();
});

app.use(parser.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
  var username = req.body.user;
  var password = req.body.pass;

  if (username == 'jared' && password == 'abc123') {
    res.sendFile(path.join(__dirname, "tasks.html"));
  }
  else if (username == 'oliverio' && password == 'def456') {
    res.sendFile(path.join(__dirname, "tasks.html"));
  }
  else if (username == 'admin' && password == 'tcc123') {
    res.sendFile(path.join(__dirname, "tasks.html"));
  }
  else if (username == 'student' && password == '123zxc') {
    res.sendFile(path.join(__dirname, "tasks.html"));
  }
  else if (username == 'user' && password == '987cba') {
    res.sendFile(path.join(__dirname, "tasks.html"));
  }
  else {
    res.status(204).send();
  }
});


app.post('/enter-tasks', (req, res) => {
  var task = req.body.inputTask;
  MongoClient.connect('mongodb://localhost:27017/enter-tasks', (err, db) => {
    if (err) throw err
    var dbc = db.collection('tasks');
    dbc.insert({ 'newTask': task }, (err, result) => {
      console.log(result);
      db.close();
    });
  });
});


app.listen(4000, () => {
  console.log('listening');
})

