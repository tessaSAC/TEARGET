'use strict';
window.app = angular.module('FullstackGeneratedApp', ['fsaPreBuilt', 'ui.router', 'ui.bootstrap', 'ngAnimate', 'stripe.checkout', 'ngRoute']);

app.config(function ($urlRouterProvider, $locationProvider) {
	// This turns off hashbang urls (/#about) and changes it to something normal (/about)
	$locationProvider.html5Mode(true);
	// If we go to a URL that ui-router doesn't have registered, go to the "/" url.
	$urlRouterProvider.otherwise('/');
	// Trigger page refresh when accessing an OAuth route
	$urlRouterProvider.when('/auth/:provider', function () {
		window.location.reload();
	});
});

// This app.run is for controlling access to specific states.
app.run(function ($rootScope, AuthService, $state) {

	// The given state requires an authenticated user.
	var destinationStateRequiresAuth = function (state) {
		return state.data && state.data.authenticate;
	};

	// $stateChangeStart is an event fired
	// whenever the process of changing a state begins.
	$rootScope.$on('$stateChangeStart', function (event, toState, toParams) {

		if (!destinationStateRequiresAuth(toState)) {
			// The destination state does not require authentication
			// Short circuit with return.
			return;
		}

		if (AuthService.isAuthenticated()) {
			// The user is authenticated.
			// Short circuit with return.
			return;
		}

		// Cancel navigating to new state.
		event.preventDefault();

		AuthService.getLoggedInUser().then(function (user) {
			// If a user is retrieved, then renavigate to the destination
			// (the second time, AuthService.isAuthenticated() will work)
			// otherwise, if no user is logged in, go to "login" state.
			if (user) {
				$state.go(toState.name, toParams);
			} else {
				$state.go('login');
			}
		});

	});

});


// SIMPLE APP CONTROLLER

// app.controller('SimpleExampleController',function() { // When would I use `app` vs `FullstackGeneratedApp`?
// 	console.log('In the controller!');
// 	this.doCheckout = function(token) {
// 		alert('Got Stripe token: ' + token.id);
// 	};
// });



// CUSTOM APP CONTROLLER

// app
//   .config(function($routeProvider, StripeCheckoutProvider) {
//     // You can use the provider to set defaults for all handlers
//     // you create. Any of the options you'd pass to
//     // StripeCheckout.configure() are valid.
//     StripeCheckoutProvider.defaults({
//       key: "YOUR_PUBLISHABLE_KEY_HERE"
//     });

//     $routeProvider
//       .when("/",{
//         templateUrl: "main.html"
//       })
//       .when("/buy",{
//         templateUrl: "buy.html",
//         controller: "CustomExampleController as ctrl",
//         resolve: {
//           // checkout.js isn't fetched until this is resolved.
//           stripe: StripeCheckoutProvider.load
//         }
//       });
//   })
//   .run(function($log, StripeCheckout) {
//     // You can set defaults here, too.
//     StripeCheckout.defaults({
//       opened: function() {
//         $log.debug("Stripe Checkout opened");
//       },

//       closed: function() {
//         $log.debug("Stripe Checkout closed");
//       }
//     });
//   })
//   .controller("CustomExampleController",function($log, StripeCheckout) {
//     // You should configure a handler when the view is loaded,
//     // just as you would if you were using checkout.js directly.
//     var handler = StripeCheckout.configure({
//         name: "Custom Example",
//         token: function(token, args) {
//           $log.debug("Got stripe token: " + token.id);
//         }
//     });

//     this.doCheckout = function(token, args) {
//     	console.log('Hi, Geoff!');

//       var options = {
//         description: "Ten dollahs!",
//         amount: 1000
//       };

//       // The default handler API is enhanced by having open()
//       // return a promise. This promise can be used in lieu of or
//       // in addition to the token callback (or you can just ignore
//       // it if you like the default API).
//       //
//       // The rejection callback doesn't work in IE6-7.
//       handler.open(options)
//         .then(function(result) {
//           alert("Got Stripe token: " + result[0].id);
//         },function() {
//           alert("Stripe Checkout closed without making a sale :(");
//         });
//     };
//   });