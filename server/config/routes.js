let controller = require('../controller/controller.js');

module.exports = app => {
	// enter routes here. [Format is app.<app/get/post/delete>('url', callback)]
	app.get('/api/getusers', controller.getusers);
	app.post('/api/register', controller.register);
	app.post('/api/login', controller.login);
	app.get('/api/logout', controller.logout);
	app.post('/api/yelpPOST', controller.yelpSearchPOST)
}
