/**
 * MelbJS App.
 */

var express = require('express');
var stylus = require('stylus');
var app = express.createServer();

// Configuration

app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.methodOverride());

	// Stylus (compiled css).
	app.use(stylus.middleware({
		src: __dirname + '/views',
		dest: __dirname + '/public',
	}));

	app.use(app.router);
	app.use(express.static(__dirname + '/public'));

	// Default to EJS templates.
	app.set('views', __dirname + '/views');
	app.set('view engine', 'ejs');
});

app.configure('development', function(){
	app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
	app.use(express.errorHandler());
});

// Routes

app.get('/', function(req, res) {
	var articles = require('./articles');
	res.render('index', {
		title: 'MelbJS',
		meetupDate: 'Every second Wednesday of the month.',
		articles: articles,
	});
});

module.exports = app;