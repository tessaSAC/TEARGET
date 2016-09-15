const express = require('express'),
	  router = express.Router(),
	  User = require('../../../db/models/user'),
	  Cart = require('../../../db/models/cart');


router.get('/:userId', function(request, response, next) {

	let userId = request.params.userId;
	User.findById(userId)
	.then(function(user) {
		response.json(user);
	})
	.catch(next);
});

router.get('/:userId/cart/', function(request, response, next) {

	let userId = request.params.userId;
	User.findById(userId)
	.then(function(user) {
		return user.getCarts();
	})
	.then(function(carts){
		response.json(carts);
	})
	.catch(next);
});

module.exports = router;
