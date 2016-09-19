
app.config(function ($stateProvider) {
    $stateProvider.state('suppliers', {
        url: '/suppliers',
        templateUrl: 'js/suppliers/suppliers.html',
        controller: 'SuppliersCtrl',
        resolve: {
            suppliers: function(SupplierFactory){
                return SupplierFactory.getAll();
            }
        }
    });
    $stateProvider.state('supplier', {
        url: '/suppliers/:id',
        templateUrl: 'js/suppliers/supplier.html',
        controller: 'SupplierCtrl',
        resolve: {
            supplier : function(SupplierFactory, $stateParams){
                return SupplierFactory.getOneMan($stateParams.id);
            }
        }
    });
});


app.controller('SuppliersCtrl', function($scope, suppliers){
    $scope.suppliers = suppliers;
});

app.controller('SupplierCtrl', function($scope, supplier){
    $scope.supplier = supplier;
})

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
