app.config(function ($stateProvider) {
    $stateProvider.state('home', {
        url: '/',
        templateUrl: 'js/home/home.html',
        controller: function ($scope, FullstackPics) {
		    // Images of beautiful Fullstack people.
		    $scope.images = _.shuffle(FullstackPics);
	    }
	});
});