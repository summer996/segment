var express = require('express');
var router = express.Router();
var userModel = require('../models/userModel.js');
var mainModel = require('../models/mainModel.js');

/* GET users listing. */
/*router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/
//管理员登录
router.post('/admLogin', function(req, res) {
	userModel.admLogin(req,res);
});
//后台信息添加
router.all('/addLogin', function(req, res) {
	res.render('admAdd');
});
//注册
router.all('/login', function(req, res) {
	subflag = req.body['subflag'];
	if(subflag == undefined){
		res.render('login');
	}
	else{

		userModel.login(req,res);
	}
  
});
//新生报名
router.post('/signUp', function(req, res) {
	userModel.signUp(req,res);
});



router.all('/userMain', function(req, res) {
	res.render('main');
});
router.all('/book', function(req, res) {
	res.render('book');
});
router.all('/mains', function(req, res) {
	res.render('main');
});

router.post('/zhuce', function(req, res) {
  //nicheng = req.body['nicheng'];
  userModel.zhuce(req,res);
}); 
router.post('/bookAdd', function(req, res) {
  //nicheng = req.body['nicheng'];
  mainModel.bookDetails(req,res);
  
});
router.post('/conponents', function(req, res) {
  //nicheng = req.body['nicheng'];
  mainModel.componentsDetails(req,res);
  
});
router.post('/money', function(req, res) {
  //nicheng = req.body['nicheng'];
  mainModel.moneyDetails(req,res);
  
});

//信息获取的路由
router.get('/bookContent', function(req, res) {
	  mainModel.bookContent(req,res);
});
router.get('/componentContent', function(req, res) {
	  mainModel.componentContent(req,res);
});
router.get('/moneyContent', function(req, res) {
	  mainModel.moneyContent(req,res);
});
router.get('/signUpInfo', function(req, res) {
	  mainModel.signUpInfo(req,res);
});

//借路由
router.post('/borrow_books',function(req,res){
	mainModel.borrow_books(req,res);
});
router.post('/borrow_components',function(req,res){
	mainModel.borrow_components(req,res);
});
//还
router.post('/back_book',function(req,res){
	mainModel.back_book(req,res);
});
router.post('/back_component',function(req,res){
	mainModel.back_component(req,res);
});
//借信息查看
router.get('/info_components', function(req, res) {
	  mainModel.info_components(req,res);
});
router.get('/info_book', function(req, res) {
	  mainModel.info_book(req,res);
});
//页面信息跳转
router.get('/component', function(req, res) {
	res.render('main');
});
router.get('/book', function(req, res) {
	res.render('book');
});
router.get('/money', function(req, res) {
	res.render('money');
});
router.get('/signup', function(req, res) {
	res.render('signUpInfo');
});
module.exports = router;
