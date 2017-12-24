
var express = require('express');
var router = express.Router();
var mainModel = require('../models/mainModel.js');


/* GET home page. */
router.get('/', function(req, res) {
	 loginbean = req.session.loginbean;
	 
	 res.render('index',{loginbean:loginbean});
});
router.get('/logout', function(req, res) {
	  req.session.destroy(function(err){
	  	res.redirect('/');
	  });
});

module.exports = router;
