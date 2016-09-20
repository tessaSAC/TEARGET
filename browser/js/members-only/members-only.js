app.config(function ($stateProvider) {

    $stateProvider.state('admin', {
        url: '/admin',
        templateUrl: 'js/members-only/admin.html',
        controller: function ($scope, UserFactory, ProductFactory, SupplierFactory) {
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
        }

    });
});

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
