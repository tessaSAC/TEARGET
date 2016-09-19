app.config(function ($stateProvider) {
    $stateProvider.state('products', {
       abstract: 'AllProducts',
       templateUrl : 'js/products/productBar.html'

    })
    $stateProvider.state('products.AllProducts', {
        url: '/products',
        templateUrl: 'js/products/products.html',
        controller: 'ProductsCtrl',
        resolve: {
            products: function(ProductFactory){
                return ProductFactory.getAll();
            }
        }
    })
    $stateProvider.state('product' ,{
        url: '/:id',
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
        url: '/organic/:bool',
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
        url: '/state/:emotion',
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
})


app.factory('ProductFactory', function($http){
    var getAll = function(){
       return $http.get('/api/tears')
            .then( function(response){
                return response.data;
            });
    };
    var getOneTear = function(tearId){
        return $http.get('/api/tears/' + tearId)
            .then( function(response){
                return response.data
            });
    };
    var getManTears = function(manId){
        return $http.get('/api/man/' + manId + '/tears')
            .then( function(response){
                return response.data
            });
    };
    var getStateTears = function(state){
       return $http.get('/api/tears/?state=' + state)
            .then( function(response){
                return response.data
            });
    };
    var getOrganicTears = function(bool){
        return $http.get('/api/tears/?organic=' + bool)
            .then( function(response){
                return response.data
            });
    };
    var getManById = function(id){
       return $http.get('/api/men/' + id)
            .then( function(response){
                return response.data
            })
    }

     return {
        getAll: getAll,
        getOneTear: getOneTear,
        getManTears: getManTears,
        getStateTears: getStateTears,
        getOrganicTears: getOrganicTears,
        getManById: getManById
    };

});
