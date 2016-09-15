app.config(function ($stateProvider) {

    $stateProvider.state('signup', {
        url: '/signup',
        templateUrl: 'js/signup/signup.html',
        controller: 'SignupCtrl'
    });

});

app.controller('SignupCtrl', function ($rootScope, $scope, AuthService, $state, $http) {

    $scope.login = {};
    $scope.error = null;

    $scope.signup = function (loginInfo) {

        $http.post('/signup', loginInfo)
        .then(function(){
            AuthService.login(loginInfo).then(function () {
                $state.go('home');
            }).catch(function () {
                $scope.error = 'Invalid login credentials.';
            });
        });
    };
});