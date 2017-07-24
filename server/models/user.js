//each individual schema goes here:

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//if using bcrypt
const bcrypt = require('bcrypt');

let UserSchema = new Schema({
	f_name: {
		type: String, 
		required: [true, 'Please insert a first name']
	},
	
	l_name: {
		type: String, 
		required: [true, 'Please insert a last name']
	},
	
	email: {
		type: String,
		required: [true, 'Please insert an email'],
		validate: {
			validator: (value) => {
				return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value);
			},
			message: "Please insert a valid email"
		},
		unique: true,
	},
	
	password: {
		type: String,
		required: [true, 'Please insert a password'],
		minlength: [8, 'Password must be longer than 8 characters']
	},
	
	zipcode: {
		type: Number,
		required: [true, 'Please insert a zipcode']
	},
	
	birthday: {
		type: Date
	}

}, {timestamps: true});

mongoose.model( 'User', UserSchema);