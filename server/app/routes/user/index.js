const express = require('express');
const router = express.Router();
const User = require('../../../db/models/user');
// const Cart = require('../../../db/models/cart');

router.param('userId', function (request, response, next, id) { // 'userID' matches param reqs below || `id` injects ID;
	User.findById(id)
	.then(function(findingUser){
		if (findingUser) {
			request.foundUser = findingUser; // Put it on request because request is handled inside param
			// Request goes through all the middleware; response goes through ONLY one
			return next();
		} else {
			const err = new Error("User not found!");
			err.status = 404;
			throw err;
		}
	}).catch(next);
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

// returns the user's oder history
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

// userid/orders/:months?

module.exports = router;
