'use strict'

exports.handler = (req, res, next) =>{
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
} 