app.config(function ($stateProvider) {
    $stateProvider.state('suppliers', {
        url: '/',
        templateUrl: 'js/suppliers/suppliers.html',
        controller: 'SuppliersCtrl'
    });
});

app.controller('SuppliersCtrl', function($scope, $state, ProductFactory){
    SupplierFactory.getAll()
    .then(function(suppliers){
        $scope.suppliers = suppliers;
    })
    $scope.error = null;
});

app.factory('SupplierFactory', function($http){
    var getAll = function(){
        $http.get('/api/men')
        .then( function(response){
            return response.data;
        });
    };
    var getOneMan = function(id){
        $http.get('/api/men/id')
        .then( function(response){
            return response.data;
        })
    }
})