const express = require('express'),
	  router = express.Router(),
	  User = require('../../../db/models/user'),
	  Cart = require('../../../db/models/cart');

let userId;


// router.use('/:userId', function(request, response, next) {
// 	if (request.params.userId) userId = request.params.userId;
// 	else throw Error;
// });


router.get('/:userId', function(request, response, next) {
	let userId = request.params.userId;

	User.findOne({
		where: { id: userId }
	})
	.then(function(user) {
		Cart.findOne({
			where: {id: user.cartId}
		})
		.then(function(cart){
			response.json(cart);
		})
	})
	.catch(next);
});


router.post('/:itemName', function(request, response, next) {
	return Cart.findOne({
		where: { userId: userId }
	}).then(function(findingCart) {

		if (findingCart) {
			// BOOLEAN FOR WHETHER PRODUCT IS IN CART
			let isInCart = false;

			// IF PRODUCT IS IN CART INCREMENT BY ONE
			for (let product in findingCart) {
				if (product === request.body.itemName) {
					isInCart = true;
					++(findingCart[product]);
				}
			}
			// IF PRODUCT NOT IN CART ADD ONE TO CART
			if (!isInCart) findingCart[product] = 1;

		}
	});
});



router.delete('/:itemToDelete', function(request, response, next) {
	User.findById(userId)
	.then(function(findingItemToDelete) {
		if (findingItemToDelete) {
			return findingItemToDelete.destroy()
			.then(function() {
				response.sendStatus(204);
			});
		}
		else response.status(404).send("Item not found");
	});
});

module.exports = router;