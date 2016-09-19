app.config(function ($stateProvider) {
    $stateProvider.state('products', {
       abstract: 'AllProducts',
       templateUrl: 'js/products/productBar.html',
       controller: 'BarCtrl'

    });
    $stateProvider.state('products.AllProducts', {
        url: '/products',
        templateUrl: 'js/products/products.html',
        controller: 'ProductsCtrl',
        resolve: {
            products: function(ProductFactory){
                return ProductFactory.getAll();
            }
        }
    });
    $stateProvider.state('product', {
        url: '/products/:id',
        parent: 'products',
        templateUrl: 'js/products/product.html',
        controller: 'ProductDetailCtrl',
        resolve: {
            product: function (ProductFactory, $stateParams) {
                return ProductFactory.getOneTear($stateParams.id);
            }
        }
    })
    $stateProvider.state('organicProducts', {
        url: '/products/organic/:bool',
        parent: 'products',
        templateUrl: 'js/products/products.html',
        controller: 'OrganicCtrl',
        resolve: {
            products: function(ProductFactory, $stateParams) {
                return ProductFactory.getOrganicTears($stateParams.bool);
            }
        }
    })
    $stateProvider.state('emotionProducts', {
        url: '/products/state/:emotion',
        parent: 'products',
        templateUrl: 'js/products/products.html',
        controller: 'EmotionCtrl',
        resolve: {
            products: function(ProductFactory, $stateParams) {
                return ProductFactory.getStateTears($stateParams.emotion);
            }
        }
    })
});

