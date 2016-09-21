app.config(function($stateProvider){

	$stateProvider.state('product.review', {
		url: '/reviews',
		templateUrl: 'js/reviews/review.html',
		controller: 'ReviewCtrl'
	})

});


app.controller('ReviewCtrl', function($scope, $state, ReviewFactory){

	$scope.postReview = function(productId, review){
		ReviewFactory.postReview(productId, review)
		.then(function(){
			$state.reload();
		});
	}

});


app.factory('ReviewFactory', function($http){
	let ReviewFactory = {};

	ReviewFactory.postReview = function(productId, review){
		return $http.post('api/tears/' + productId + '/reviews', review);
	}

	return ReviewFactory;
});
