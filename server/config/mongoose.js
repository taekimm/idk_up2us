let mongoose = require('mongoose');
let path = require('path');
let fs = require('fs');


mongoose.connect('mongodb://admin:@ds111123.mlab.com:11123/idkup2us');

let models_path = path.join(__dirname, '../models/');

fs.readdirSync(models_path).forEach(function(file){
	if (file.indexOf(".js") >= 0){
		require(path.join(models_path, file));
	}
})
