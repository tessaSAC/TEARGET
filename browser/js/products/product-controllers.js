app.controller('ProductsCtrl', function($scope, products){
    $scope.products = products;
});

app.controller('ProductDetailCtrl', function($scope, product, CartFactory){
    $scope.product = product;
    $scope.addItemToCart = CartFactory.addItemToCart;
  //   $scope.addToCart = function(id){
		// console.log('THIS IS THE PRODUCT ID YOU WANT TO PUT ON THE CART', id);
  //   }
});

app.controller('OrganicCtrl', function($scope, products){
    $scope.products = products;
});

app.controller('EmotionCtrl', function($scope, products){
    $scope.products = products;
})
