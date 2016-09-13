var router = require('express').Router();
var User = require('../../../db').model('User');
module.exports = router;


// get request to login page.
router.get('/signup', function(req, res, next){
	User.create({
		where: {
			name: req.name,
			password: req.password
		}
	})
	.then(function(user){
		res.redirect('/');
		// set cookies

	});

});


router.get('/', function(req, res, next){
	User.find({
		where: {
			name: req.name
		}
	})
	.then(function(user){
		res.send('');
		// redirect them to front page if successful
			// set cookies to log them in
		// find out what an empty find returns
		  // if not found keep them on same page, front end an error message.
	});

});

// for Oauth
router.use('/google', require('./google.oauth'));
router.use('/twitter', require('./twitter.oauth'));
router.use('/github', require('./github.oauth'));
