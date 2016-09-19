app.config(function ($stateProvider) {
    $stateProvider.state('search', {
            url: '/products/search',
            templateUrl: 'js/products/search.html',
            controller: 'ProductsCtrl',
            resolve: {
                products: function(ProductFactory){
                    return ProductFactory.getAll();
                }
            }
        });
});

