var mysql = require('mysql');

module.exports = (function(){

	var pool = mysql.createPool({
		host:'localhost',
		user:'lilin',
		password:'123456',
		database:'segment',
		port:'3306'
	});

	pool.on('connection',function(connection){
		connection.query('SET SESSION auto_increment_increment = 1');
	})
	return function(){
		return pool;
	}
})();

