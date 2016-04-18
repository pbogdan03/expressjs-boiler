'use strict';

let express = require('express');
let router = express.Router();
require('colors');

/**
 ***********************************************
 *	Home route
 ***********************************************
 */

router.get('/', (req, res, next) => {
	res.sendfile(__dirname + '/dist/index.html');
});

module.exports = router;
