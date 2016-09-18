app.factory('CartFactory', function($http){

	var CartFactory = {};

	// return cart as an array of product ids.
	CartFactory.getCart = function(userId){
		return $http.get('/api/user/' + userId + '/cart')
		.then(function(cart){
			cart = cart.data[0];
			return cart;
		})
	}

	// save the cart to the db
	CartFactory.sendCart = function(){

	}

	// get the total for the cart
	CartFactory.getTotal = function(){

	}

	return CartFactory;

});
