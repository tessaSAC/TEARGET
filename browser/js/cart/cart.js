app.config(function ($stateProvider) {
    $stateProvider.state('cart', {
        url: '',
        templateUrl: 'js/cart/cart.html',
        controller: 'CartCtrl'
    });
});

app.controller('CartCtrl', function($scope, $state, CartFactory, Session){

	$scope.cartArray = CartFactory.cartToArray(localStorage.cart);
	$scope.userId = Session.user.id;
	$scope.itemNums = null;
	// $scope.products = null;
	$scope.obj = null;
	$scope.totalCents = 0;

	CartFactory.getProductNames($scope.userId, $scope.cartArray)
	.then(function(names){
		$scope.products = names;
		return $scope.products;
	})
	.then(function(products){
		$scope.obj = CartFactory.getProductObj(products);
		return $scope.obj;
	})
	.then(function(cartObj){
		$scope.totalCents = CartFactory.getTotalCents(cartObj);
	});

	if (localStorage.cart === 'null'){
		$scope.itemNums = 0;
	}
	else {
		$scope.itemNums = $scope.cartArray.length;
	}

})

app.factory('CartFactory', function($http, $q){

	let CartFactory = {};

	// return cart as an array of product ids.
	CartFactory.getCart = function(userId){
		return $http.get('/api/user/' + userId + '/cart')
		.then(function(cart){
			cart = cart.data[0];
			return cart;
		})
	}

	// save the cart to the db
	CartFactory.sendCart = function(userId, cart){
		return $http.post('/api/user/' + userId + '/cart', cart);
	}

	// get the total for the cart
	CartFactory.getTotal = function(userId){
		return $http.get('/api/user/' + userId + '/cart')
		.then(function(cart){
			cart = cart.data[0];
			return cart;
		})
		.then(function(cart){
			return cart;
		})
	}

	// convert the localStorage cart into an array of ints
	CartFactory.cartToArray = function(strCart){
		strCart = strCart.split(',');
		strCart = strCart.map(function(ele){
			return Number(ele);
		});
		return strCart;
	}

	CartFactory.getProductNames = function(userId, cartArray){
		// cartArr = cartArr.filter(function(item, index, inputArray) {
		// return inputArray.indexOf(item) == index;
		// });

		let cartObj = {};

        return $http.post('/api/user/' + userId + '/cart', cartArray)
        .then(function(){

			let promises = [];
			cartArray.forEach(function(ele){
				promises.push($http.get('/api/tears/' + ele));
			});

			return $q.all(promises);
        })
        .then(function(products){
			products = products.map(function(product){
				return [product.data.title, product.data.price];
			});

			return products;
        });
	}

	CartFactory.getProductObj = function(names){

		let prices = names.map(function(name){
			return name[1];
		});

		names = names.map(function(name){
			return name[0];
		});


		let obj = {};
		names.forEach(function(name, index){

			if (!obj[name]) {
				obj[name] = [];
				obj[name].push(0);
				obj[name].push(prices[index]);
			}

			obj[name][0] += 1;
		});

		return obj;
	}

	CartFactory.getTotalCents = function(cartObj){

		let total = 0;

		for (var prop in cartObj) {
			if (cartObj.hasOwnProperty(prop)) {
				let item = cartObj[prop];
				total += item[0] * item[1];
			}
		}
		return total;
	};

	return CartFactory;

});
