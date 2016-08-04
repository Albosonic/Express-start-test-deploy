 // declarations
var express = require('express');
var bars  = require('express-handlebars');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

// middleware section
app.engine('handlebars', bars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

// parse application/json
app.use(bodyParser.json());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));

mongoose.connect('mongodb://localhost/express-start');
console.log('hello and goodbye')

var Todo = require('./models/todo.js');
// var User = require('./models/user.js');

// sign up route
app.get('/signup', function(req, res){
	res.render('signup');
});

// log in route
app.get('/signin', function(req, res){
	res.render('signin');
});

app.post('/users', function(req, res){
	console.log(req.body);
	res.json({msg: 'got it!!'});
});

// todos index
app.get('/', function (req, res) {
	Todo.find().exec(function(err, todos) {
		res.render('home', {todos: todos});
	});
    

});

// todos show
app.get('/todos/:id', function(req, res) {
	Todo.findById(req.params.id).exec(function(err, todo){
		res.render('todo-show', {todo: todo});
	});
});

// todos create
app.post('/todos', function(req, res) {
	var todo = req.body;
	Todo.create(todo, function(err, todo) {
		res.status(200).json(todo);
	});
});

// todos delete
app.delete('/todos/:id', function(req, res) {
	Todo.findById(req.params.id).exec(function(err, todo){
		todo.remove(); 
		res.status(200).json({});
	});
});

// todos update
// todos edit
// todos new

var port = Number(process.env.PORT || 3000);

// listening on server
app.listen(port, function () {
  console.log('I\'m Alive!');
});




