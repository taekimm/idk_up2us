const mongoose = require('mongoose');

//import models e.g.:
const User = mongoose.model('User');

//if using bcrypt:
const bcrypt = require('bcrypt');

module.exports = {
	getusers: (req, res) => {
		User.find({}, (err, userslist) => {
			if (err){
				console.log(err)
				return res.status(400).send(err);
			}
			else {
				return res.json(userslist)
			}
		})
	},

	register: (req, res) => {
		let newUser = new User(req.body);
		newUser.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(8));
		newUser.save( (err, generatedUser) => {
			//if errors from SAVE
			if (err){
				let errors = [];
				for(let i in newUser.errors){
					errors.push(newUser.errors[i].message)
				}
				errors.push('User with that email already exists')
				return res.status(400).send(errors);
			} 
			//all good
			else {
				req.session.user = newUser
				return res.json(generatedUser);
			}
		});
	},

	login : (req, res) => {
		//findOne b/c unique by email.
		User.findOne({email: req.body.email}, (err, foundPerson) => {
			//if errors from QUERY
			if(err){
				//pushing all error messages from QUERY from BACKEND to send to front end
				let errors = [];
				for(let i in err.errors){
					errors.push(err.errors[i].message)
				}		
				return res.status(400).send(errors);
			} 

			//if no found person is returned (i.e., does not exist)
			if ( foundPerson == null) {
				let errors = ['User does not exist.']
				return res.status(400).send(errors);
			}

			//ONE user is found
			else {
				//checking hashed password with bcrypt
				if(bcrypt.compareSync(req.body.password, foundPerson.password)) {
					req.session.user = foundPerson
					//return foundPerson as JSON
					return res.json(foundPerson)
				} 
				//password check failed
				else{
					let errors = ["Login Authorization Failed"];
					return res.status(400).send(errors)
				}
			}
		})
	},

	logout : (req, res) => {
		delete req.session
	},
}