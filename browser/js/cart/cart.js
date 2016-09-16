app.factory('CartFactory', function($http){

	var CartFactory = {};

	// return cart as an array of product ids.
	CartFactory.getCart = function(userId){
		// return $http.get('/api/user/' + Session.user.id + '/cart')
		// .then(function(cart){
		// 	cart = cart.data[0];
		// })
	}

	// save the cart to the db
	CartFactory.sendCart = function(){

	}

	// get the total for the cart
	CartFactory.getTotal = function(){

	}

	return CartFactory;

});
