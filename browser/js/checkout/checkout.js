app.config(function ($stateProvider) {

    $stateProvider.state('checkout', {
        url: '/checkout',
        templateUrl: 'js/checkout/checkout.html',
        controller: 'CheckoutCtrl'
    });
    $stateProvider.state('success', {
        url: '/checkout/success',
        templateUrl: 'js/checkout/success/html',
        controller: 'SuccessCtrl'
    })
});


app.controller('CheckoutCtrl', function($scope, CheckoutFactory){
    $scope.update = function(shipping){ 
        return CheckoutFactory.create(shipping);
    }
});

app.factory('CheckoutFactory', function($http, Session){
    var create = function(data){
        if (Session.user){
            data.userId = Session.user.id
        }
        $http.post('/api/shipping', data);
    }
});
