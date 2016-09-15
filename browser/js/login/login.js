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

        AuthService.login(loginInfo).then(function () {
            $state.go('home');
        })
        .catch(function () {
            $scope.error = 'Invalid login credentials.';
        });

            localStorage.setItem('DOG', '' + Session.user);
    };

    // localStorage.setItem('DOG', '' + Session.user);

    // let userID = $cookie.get(sid);
    // alert(userID);
    // $http.get('/cart/?user=' + userID)
    // .then(function(cart){
    //     if (cart) angular.copy(cart.data, localStorage);
    //     return localStorage;
    // })

});
