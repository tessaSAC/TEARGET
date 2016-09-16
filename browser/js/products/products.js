app.config(function ($stateProvider) {
    $stateProvider.state('AllProducts', {
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
        url: '/products/:id',
        templateUrl: 'js/products/product.html',
        controller: 'ProductDetailCtrl',
        resolve: {
            product: function (ProductFactory, $stateParams) {
                return ProductFactory.getOneTear($stateParams.id);
            }
        }
    })
});



app.controller('ProductsCtrl', function($scope, products){
    $scope.products = products;
});

app.controller('ProductDetailCtrl', function($scope, product){
    $scope.product = product;
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
       return $http.get('/api/tears/' + state)
            .then( function(response){
                return response.data
            });
    };
    var getOrganicTears = function(organic){
        return $http.get('/api/tears' + organic)
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
