const express = require('express'),
	  router = express.Router(),
	  User = require('./models/user'),
	  Cart = db.model('cart');
let userId;

Cart.belongsTo(User, {as: 'cart'});



router.use('/', function(request, response, next) {
	if (request.params.userId) userId = request.params.userId;
	else throw Error;
});



router.get('/', function(request, response, next) {
	if (userId) {
		return User.findOne({
			where: { id: userId }
		})
		.then(function(findingCart) {
			response.send(user.cart);
		});
	}
	else response.status(404).send("User not found");
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

		};
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