'use strict'

var path = require('path');

exports.get404 = () => {  
	return path.join(__dirname, '../../public', '404.html');
}