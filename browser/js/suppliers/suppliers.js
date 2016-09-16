
app.config(function ($stateProvider) {
    $stateProvider.state('suppliers', {
        url: '/suppliers',
        templateUrl: 'js/suppliers/suppliers.html',
        controller: 'SuppliersCtrl'
    });
});

app.controller('SuppliersCtrl', function($scope, $state, SupplierFactory){
    SupplierFactory.getAll()
    .then(function(suppliers){
        $scope.suppliers = suppliers;
    })
    $scope.error = null;
});

app.factory('SupplierFactory', function($http){
    var getAll = function(){
        return $http.get('/api/men')
            .then( function(response){
                return response.data;
            });
    };
    var getOneMan = function(id){
        return $http.get('/api/men/' + id)
            .then( function(response){
                return response.data;
            })
    }
    return {
        getAll: getAll,
        getOneMan: getOneMan
    }
})
