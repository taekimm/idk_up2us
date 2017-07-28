const mongoose = require('mongoose');

//import models e.g.:
const User = mongoose.model('User');

//if using bcrypt:
const bcrypt = require('bcrypt');

const yelp = require('yelp-fusion');

const token = yelp.accessToken('FXp2QyAtNItDNpVQLFTapQ', 'Fkxzml5t2gGfmeQJDU906nQi07vbAol98imOQ4RVka1SURLi8nkk4Voo1cCKorBr').then(response => {
		  // console.log(response.jsonBody.access_token);
		}).catch(e => {
		  // console.log(e);
		});


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

	yelpSearch : (req, res) => {
		const client = yelp.client('2Zpt-BoHdL-XOPH12z47CG2v-xtQytuKVA8qZJfONBtcT0hCjlTInu_tjylY6i4tYLENhc80wlI56TV9sUdoauGy6NnQ074S0x8whwNovCH1ANvbM0rW7LW99UN5WXYx');
			client.search({
			  term:'restaurant',
			  limit: 40,
			  latitude: 34.1808279,
			  longitude: -118.30909949999999,
			  radius: 5000
			})
			.then(response => {
			  return res.json(response);
			})
			.catch(e => {
			  console.log(e);
			});
	},

	yelpSearchPOST : (req, res) => {
		console.log(req.body)
		let userRadius = req.body.radius;
		let userLat = req.body.lat
		let userLong = req.body.long
		console.log(userRadius, userLat, userLong)

		const client = yelp.client('2Zpt-BoHdL-XOPH12z47CG2v-xtQytuKVA8qZJfONBtcT0hCjlTInu_tjylY6i4tYLENhc80wlI56TV9sUdoauGy6NnQ074S0x8whwNovCH1ANvbM0rW7LW99UN5WXYx');
			client.search({
			  term:'restaurant',
			  limit: 40,
			  latitude: userLat,
			  longitude: userLong,
			  radius: userRadius
			})
			.then(response => {
			  return res.json(response);
			})
			.catch(e => {
			  console.log(e);
			});
	},

	yelpUserSearch: (req, res) =>{
		console.log(req.body)
		let userRadius = req.body.radius;
		let userLat = req.body.lat;
		let userLong = req.body.long;
		console.log(userRadius, userLat, userLong)
		if(req.body.categories){
			let userCategories = req.body.categories;
		}
		if(req.body.price){
			let userPrice = req.body.price;
		}
		if(req.body.open){
			let userOpen = req.body.open;
		}

		const client = yelp.client('2Zpt-BoHdL-XOPH12z47CG2v-xtQytuKVA8qZJfONBtcT0hCjlTInu_tjylY6i4tYLENhc80wlI56TV9sUdoauGy6NnQ074S0x8whwNovCH1ANvbM0rW7LW99UN5WXYx');
		client.search({
			term: 'reestaurant',
			limit: 
			latitude: userLat,
			longitude: userLong,
			radius: userRadius,
			categories:
		})
		.then(response =>{
			return res.json(response);
		}) 
		.catch(e => {
			console.log(e);
		});
	}
}
