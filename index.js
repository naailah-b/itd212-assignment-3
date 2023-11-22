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

  MongoClient.connect('mongodb://localhost:27017/login', (err, db) => {
    if (err) throw err
    var dba = db.collection('accounts')
    //dba.accounts.createIndex({'username': 1}, {unique: true});
    dba.findOne()
    dba.insert(
      {
        'firstName': first,
        'lastName': last,
        'email': email,
        'username': username,
        'password': password
      }
    )
    db.close();
  })
  res.sendFile(__dirname + "/public/index.html");
})

/*

app.get('/login', (req, res) => {
  var user = req.body.user;
  var pass = req.body.pass;

  MongoClient.connect('mongodb://localhost:27017/login', (err, db) => {
    if (err) throw err
    
    var accounts = db.collection('accounts');
    accounts.findOne({username: user}, {password: pass}, (err, db) => {
      if (err) throw err 
      res.sendFile(__dirname + '/tasks.html');
    })
    db.close();
  });
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

*/

app.listen(4000, () => {
  console.log('listening');
})

