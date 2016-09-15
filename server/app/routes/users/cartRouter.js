const express = require('express')
const router = express.Router()
const User = require('./models/user')
const Cart = db.model('cart')
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



router.post('/', function(request, response, next) {
	return Cart.findOne({
		where: { userId: userId }
	}).then(function(findingCart) {
		if (findingCart) {
			// Iterate through cart -- if item found update item else add item with amount
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