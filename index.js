var express = require('express');
var parser = require('body-parser');
var app = express();

app.use(express.static("public"));

var MongoClient = require('mongodb').MongoClient;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Originm X-Requested-With, Content-Type, Accept");
  next();
});

app.use(parser.urlencoded({ extended: true }));

app.post('/register', (req, res) => {
  var first = req.body.firstName;
  var last = req.body.lastName;
  var email = req.body.email;
  var username = req.body.regUser;
  var password = req.body.regPass;

  MongoClient.connect('mongodb://localhost:27017/dev3', (err, db) => {
    var accounts = db.collection('accounts')
    accounts.find().toArray((err, docs) => {
      for (i = 0; i < docs.length; i++) {
        if (username == docs[i].username) {
          res.sendFile(__dirname + '/public/register.html')
        }
        else {
          dba.insert(
            {
              'firstName': first,
              'lastName': last,
              'email': email,
              'username': username,
              'password': password
            })
          db.close();
          res.sendFile(__dirname + "/public/index.html");
        }
      }
    })
  })
})

  app.post('/login', (req, res) => {
    var user = req.body.user;
    var pass = req.body.pass;

    MongoClient.connect('mongodb://localhost:27017/dev3', (err, db) => {
      if (err) throw err
      var accounts = db.collection('accounts');
      accounts.find({}).toArray((err, documents) => {
        for (i = 0; i < documents.length; i++) {
          if (user == documents[i].username && pass == documents[i].password) {
            res.sendFile(__dirname + '/public/tasks.html')
          }
          else {
            res.sendFile(__dirname + '/public/index.html');
          }
        }
      })
      db.close();
    })
  })

  app.post('/enter-tasks', (req, res) => {
    var task = req.body.inputTask;
    MongoClient.connect('mongodb://localhost:27017/dev3', (err, db) => {
      var tasks = db.collection('tasks')
      tasks.find({}).toArray((err, docs) => {
        if (err) throw err
        for (i = 0; i < docs.length; i++) {
          if (task == docs[i].newTask) {
            res.sendFile(__dirname + '/public/enter-tasks.html');
          }
          else {
            dbc.insert({ 'newTask': task });
            res.sendFile(__dirname + '/public/tasks.html');
          }
        }
        db.close();
      })

    });
  })

  app.get('/tasks', (req, res) => {
    MongoClient.connect('mongodb://localhost:27017/dev3', (err, db) => {
      db.collection('tasks').find({}).toArray((err, docs) => {
        db.close();

        if (err) {
          console.log('error');
          res.end();
        }
        else {
          let j = JSON.stringify(docs);
          res.json(j);
        }
      })
    })
  })

  app.listen(4000, () => {
    console.log('listening');
  })
