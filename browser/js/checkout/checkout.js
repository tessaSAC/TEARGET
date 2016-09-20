app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl'
    });
});

app.controller('CheckoutCtrl', function ($scope){
    $scope.submit = CheckoutFactory.create({
        name: $scope.name,
        address: $scope.address,
        city: $scope.city,
        state: $scope.state,
        zip: $scope.zip
    })
})

app.factory('CheckoutFactory', function($http){
   var create = function(data){
       console.log(data);
       $http.post('api/shipping/', data)
   }

   return {create}
})

