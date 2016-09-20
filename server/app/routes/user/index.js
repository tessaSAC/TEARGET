const express = require('express');
const router = express.Router();
const User = require('../../../db/models/user');
const Cart = require('../../../db/models/cart');

router.param('userId', function (request, response, next, id) { // 'userID' matches param reqs below || `id` injects ID;
	User.findById(id)
	.then(function(findingUser){
		if (findingUser) {
			request.foundUser = findingUser; // Put it on request because request is handled inside param
			// Request goes through all the middleware; response goes through ONLY one
			return next();
		} else {
			const err = new Error('User not found!');
			err.status = 404;
			throw err;
		}
	}).catch(next);
});

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
	// .catch(next-);

	response.send(request.foundUser);
});

// returns the user's open cart
router.get('/:userId/cart/', function(request, response, next) {
		console.log(request.foundUser);
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
		if (cart) {
			return cart.update({array: cartArray});
		}
		else {
			return Cart.create({is_open: true, userId: userId, array: cartArray});
		}
	})
	.then(function(cart){
		response.send(cart.array);
	})
	.catch(next);

});

module.exports = router;
