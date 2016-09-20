app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($rootScope, $scope, AuthService, $state, $http, Session) {

    $scope.login = {};
    $scope.error = null;

    $scope.signup = function (loginInfo) {

        $http.post('/signup', loginInfo)
        .then(function(){
            return AuthService.login(loginInfo)
        })
        .then(function () {
            return $http.get('/api/user/' + Session.user.id + '/cart')
        })
        .then(function(cart){
            localStorage.setItem('cart', cart.data[0].array);
            $state.go('home');
        })
        .catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

    };
});
