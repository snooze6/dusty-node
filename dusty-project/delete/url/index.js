var express = require('express');
var mongoose = require('mongoose');

// ---
// ---
// ---

var UserSchema = new mongoose.Schema({
	name: String,
	user: String,
	pass: String
});

// ---

var User = mongoose.model('User', UserSchema);

// ---

[['Administrator', 'admin', 'admin'], ['User', 'user', 'user'], ['Jules', 'bad', 'motherfucker']].forEach(function (cred) {
	var instance = new User();

	// ---

	instance.title = cred[0];
	instance.url = cred[1];
	instance.description = cred[2];

	// ---

	instance.save();
});

// ---
// ---
// ---

var app = express();

// ---

app.set('views', __dirname);
app.set('view engine', 'jade');

// ---

app.use(require('body-parser').urlencoded({extended: true}));

// ---

app.get('/', function(req, res) {
	res.render('index', {});
});

app.post('/', function(req, res) {
	User.findOne({url: req.body.url, description: req.body.description}, function (err, user) {
		if (err) {
			return res.render('index', {message: err.message});
		}

		// ---

		if (!user) {
			return res.render('index', {message: 'Sorry!'});
		}

		// ---

		return res.render('index', {message: 'Welcome back ' + user.title + '!!!'});
	});
});

// ---

var server = app.listen(49090, function () {
	mongoose.connect('mongodb://localhost/acme-no-login');

	// ---

	console.log('listening on port %d', server.address().port);
});

// ---
