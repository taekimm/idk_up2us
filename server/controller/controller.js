const yelp = require('yelp-fusion');

const token = yelp.accessToken('FXp2QyAtNItDNpVQLFTapQ', 'Fkxzml5t2gGfmeQJDU906nQi07vbAol98imOQ4RVka1SURLi8nkk4Voo1cCKorBr')
	.then(response => {})
	.catch(e => {});

module.exports = {

	yelpSearchPOST : (req, res) => {
		let searchLat = req.body.lat;
		let searchLong = req.body.long;		
		let searchRadius = req.body.radius;
		let searchLimit = req.body.limit;
		let searchCategories = req.body.categories;
		let searchPrice = req.body.price;

		const client = yelp.client('2Zpt-BoHdL-XOPH12z47CG2v-xtQytuKVA8qZJfONBtcT0hCjlTInu_tjylY6i4tYLENhc80wlI56TV9sUdoauGy6NnQ074S0x8whwNovCH1ANvbM0rW7LW99UN5WXYx');
			client.search({
			  term: 'restaurants',
			  categories: searchCategories,
			  limit: searchLimit,
			  latitude: searchLat,
			  longitude: searchLong,
			  radius: searchRadius,
			  price: searchPrice,

			})
			.then(response => {
			  return res.json(response);
			})
			.catch(e => {
			  return res.json(e);
			});
	},
}
