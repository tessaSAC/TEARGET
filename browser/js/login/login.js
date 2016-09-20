app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

app.controller('LoginCtrl', function ($scope, AuthService, $state, $http, Session) {

    $scope.login = {};
    $scope.error = null;


    $scope.sendLogin = function (loginInfo) {

        $scope.error = null;

        AuthService.login(loginInfo)
        .then(function () {
            return $http.get('/api/user/' + Session.user.id + '/cart')
        })
        .then(function(cart){
            console.log('THIS IS THE CART:', cart);
            localStorage.setItem('cart', cart.data[0].array);
            $state.go('home');
        })
        .catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});
