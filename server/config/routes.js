let controller = require('../controller/controller.js');

module.exports = app => {
	// enter routes here. [Format is app.<app/get/post/delete>('url', callback)]
	app.post('/api/yelpPOST', controller.yelpSearchPOST)
}
