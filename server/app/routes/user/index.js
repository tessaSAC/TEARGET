const express = require('express');
const router = express.Router();
const User = require('../../../db/models/user');
// const Cart = require('../../../db/models/cart');

router.get('/', function(request, response, next) {

	User.findAll()
	.then(function(users) {
		response.json(users);
	})
	.catch(next);

});

router.get('/:userId', function(request, response, next) {

	let userId = request.params.userId;
	User.findById(userId)
	.then(function(user) {
		response.json(user);
	})
	.catch(next);
});

// returns the user's open cart
router.get('/:userId/cart/', function(request, response, next) {

	let userId = request.params.userId;

	User.findById(userId)
	.then(function(user) {
		if (user) return user.getCarts({where: {is_open: true}});
		throw new Error('That user does not exist.');
	})
	.then(function(carts){
		response.json(carts);
	})
	.catch(next);
});

// returns the user's oder history
router.get('/:userId/orders/', function(request, response, next) {

	let userId = request.params.userId;

	User.findById(userId)
	.then(function(user) {
		if (user) return user.getCarts({where: {is_open: false}});
		throw new Error('That user does not exist.');
	})
	.then(function(carts){
		response.json(carts);
	})
	.catch(next);
});


// Update the user's cart
router.post('/:userId/cart/', function(request, response, next) {

});

module.exports = router;
