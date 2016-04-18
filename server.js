'use strict';

let express = require('express');
let path = require('path');
try {
	let dotenv = require('dotenv');
	dotenv.load();
} catch (err) {
	console.log('----------- no dotenv module (no problem) -----------');
}

// load routes
let routes = require('./routes');

let env = process.env.NODE_ENV || 'development';
let app = express();

if (env === 'development') {
	app.use(require('connect-livereload')());
}
app.use(express.static(path.join(__dirname, './dist')));
app.use(routes);

module.exports = app;
