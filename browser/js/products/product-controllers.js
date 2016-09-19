app.controller('ProductsCtrl', function($scope, products){
    $scope.products = products;
});

app.controller('ProductDetailCtrl', function($scope, product, CartFactory){
    $scope.product = product;
    $scope.addItemToCart = CartFactory.addItemToCart;
});

app.controller('OrganicCtrl', function($scope, products){
    $scope.products = products;
});

app.controller('EmotionCtrl', function($scope, products){
    $scope.products = products;
})
