app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/members-only/admin.html',
        controller: 'AdminCtrl'

    });
});

app.controller('AdminCtrl', function ($scope, $state, UserFactory, ProductFactory, SupplierFactory) {
            UserFactory.getUsers()
            .then(function (users){
                $scope.users = users;
            });
            ProductFactory.getAll()
            .then( function(products){
                $scope.products = products;
            });
            SupplierFactory.getAll()
            .then( function(suppliers){
                $scope.suppliers = suppliers
            })
            $scope.deleteSupplier = function(id){
                 SupplierFactory.deleteOne(id)
                 .then($state.reload());
            };
            $scope.deleteProduct = function(id){
                ProductFactory.deleteOne(id)
                .then($state.reload())
            }
        })

app.factory('UserFactory', function ($http) {

    var getUsers = function () {
        return $http.get('/api/user').then(function (response) {
            return response.data;
        });
    };

    return {
        getUsers
    };

});
