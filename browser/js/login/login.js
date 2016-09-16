app.config(function ($stateProvider) {

    $stateProvider.state('login', {
        url: '/login',
        templateUrl: 'js/login/login.html',
        controller: 'LoginCtrl'
    });

});

// Storage.prototype.setObject = function(key, value) {
//     this.setItem(key, JSON.stringify(value));
// }

// Storage.prototype.getObject = function(key) {
//     var value = this.getItem(key);
//     return value && JSON.parse(value);
// }

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
            cart = cart.dataValues;
            localStorage.setItem('cart', Session.user.id);
            $state.go('home');
        })
        .catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };

});
