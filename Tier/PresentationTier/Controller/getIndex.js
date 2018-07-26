'use strict'

var path = require('path');

exports.getIndex = () => {  
	return path.join(__dirname, '../../public', 'index.html');
}
