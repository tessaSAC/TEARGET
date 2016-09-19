app.controller('ProductsCtrl', function($scope, products){
    $scope.products = products;
});

app.controller('ProductDetailCtrl', function($scope, product){
    $scope.product = product;
});

app.controller('OrganicCtrl', function($scope, products){
    $scope.products = products;
});

app.controller('EmotionCtrl', function($scope, products){
    $scope.products = products;
});

app.controller('BarCtrl', function($scope){
    console.log($scope.selected);
})
