app.config(function ($stateProvider) {
    $stateProvider.state('products', {
        url: '/',
        templateUrl: 'js/products/products.html', 
        controller: 'ProductsCtrl'
    });
});

app.controller('ProductsCtrl', function($scope, $state, ProductFactory){
    ProductFactory.getAll()
    .then(function(products){
        $scope.products = products;
    })
    $scope.error = null;
})

app.factory('ProductFactory', function($http){
    var getAll = function(){
        $http.get('/api/tears')
        .then( function(response){
            return response.data;
        });
    };        
    var getOneTear = function(tearId){
        $http.get('/api/tears/' + tearId)
        .then( function(response){
            return response.data
        });
    };
    var getManTears = function(manId){
        $http.get('/api/man/' + manId + '/tears')
        .then( function(response){
            return response.data
        });
    };
    var getStateTears = function(state){
        $http.get('/api/tears/' + state)
        .then( function(response){
            return response.data
        });
    };
    var getOrganicTears = function(organic){
        $http.get('/api/tears' + organic)
        .then( function(response){
            return response.data
        });
    };
    var getManbyId = function(id){
        $http.get('/api/men/' + id)
        .then( function(response){
            return response.data
        })
    }
    
     return {
        getAll: getAll,
        getOneTear: getOneTear,
        getManTears: getManTears,
        getStateTears: getStateTears,
        getOrganicTears: getOrganicTears
    };

});