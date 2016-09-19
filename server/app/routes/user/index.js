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

// returns the user's order history (all closed carts)
// cart array must be on the request body
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


// Update the user's cart in the database
router.post('/:userId/cart/', function(request, response, next) {

	let userId = request.params.userId;
	let cartArray = request.body.cart;

	User.findById(userId)
	.then(function(user) {
		if (user) return user.getCarts({where: {is_open: true}});
		throw new Error('That user does not exist.');
	})
	.then(function(carts){
		let cart = carts[0];
		return cart.update({array: cartArray});
	})
	.then(function(){
		response.status(200).send();
	})
	.catch(next);

});

module.exports = router;
