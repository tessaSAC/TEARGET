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

	// let userId = request.params.userId;
	// User.findById(userId)
	// .then(function(user) {
	// 	response.json(user);
	// })
	// .catch(next);

	response.send(request.foundUser);
});

// returns the user's open cart
router.get('/:userId/cart/', function(request, response, next) {

	// let userId = request.params.userId;

	// User.findById(userId)
	// .then(function(user) {
		// if (user) return user.getCarts({where: {is_open: true}});
	// 	throw new Error('That user does not exist.');
	// })
	// .then(function(carts){
	// 	response.json(carts);
	// })
	// .catch(next);

	request.foundUser.getCarts({ where: { is_open: true }})
	.then(function(findingOpenCart) {
		response.send(findingOpenCart);
	})
	.catch(next);

});

// returns the user's order history (all closed carts)
// cart array must be on the request body
router.get('/:userId/orders/', function(request, response, next) {

	// let userId = request.params.userId;

	// User.findById(userId)
	// .then(function(user) {
	// 	if (user) return user.getCarts({where: {is_open: false}});
	// 	throw new Error('That user does not exist.');
	// })
	// .then(function(carts){
	// 	response.json(carts);
	// })
	// .catch(next);

	request.foundUser.getCarts({ where: { is_open: false }})
	.then(function(findingClosedCarts) {
		response.send(findingClosedCarts);
	})
	.catch(next);
});


// Update the user's cart in the database and return the new array.
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
	.then(function(cart){
		// console.log(cart.array);
		response.send(cart.array);
	})
	.catch(next);

});

module.exports = router;
