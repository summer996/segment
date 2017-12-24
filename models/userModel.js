var connPool = require('../models/connPool.js');
var loginBean = require('../jsbean/loginBean.js');

module.exports = {
	admLogin:function(req,res){
		pool = connPool();

		//通过pool连接数据库
		pool.getConnection(function(err,conn){
			if(err){
				res.send('获取的的连接错误：' + err.message);
				return;
			}
			var admUserSql = 'select admid,nicheng from admUsers where nicheng = ? and admPwd = ?';
			var param = [req.body['nicheng'],req.body['admPwd']];
			conn.query(admUserSql,param,function(err,rs){
				if(err){
					res.send("数据库连接错误，错误原因：" + err.message);
					return;
				}
				console.log('输出结果集：' + rs);
				if(rs.length > 0){
					loginbean = new loginBean();//实例化loginBean
					loginbean.id = rs[0].admid;
					loginbean.nicheng = rs[0].nicheng;
					req.session.loginbean = loginbean;
					res.redirect(307,'./addLogin');//跳转的只能是设置在路由里面的路径
					
					console.log("登陆成功");
					console.log(loginbean);
				}
				else{
					res.send('用户名/密码错误/用户不存在');
				}
			});
			conn.release();
		});
	},
	zhuce:function(req,res){

		pool = connPool();
 
		//通过pool连接数据库
		pool.getConnection(function(err,conn){
			if(err){
				res.send('获取连接错误：' + err.message);
				console.log('获取连接错误：' + err.message);
				return;
			}
			//req.body[]  只接收post    req.query[]  只接收get
			var userAddSql = "insert into user (email,pwd,nicheng,createtime) values (?,?,?,current_timestamp)";
			
			var param = [req.body['email'],req.body['pwd'],req.body['nicheng']];
			conn.query(userAddSql,param,function(err,conn){
				if(err){
					//res.send('数据库插入错误：' + err.message);
					//console.log('数据库插入错误：' + err.message);
					errStr = err.message;//查看报错原因，通过字符串查找
					console.log(errStr);
					sendStr = '<script>';
					/*if(errStr.indexOf('nichenguniq') > -1){
						sendStr += 'alert("昵称重复！");';
						//res.send(err.message);
						console.log("数据库：" + err.message);

					}*/
					
					sendStr += 'alert("昵称重复！");';
					//res.send(err.message);
					console.log("数据库：" + err.message);
					sendStr += 'history.back();</script>';
					res.send(sendStr);
					return;
				}
				//res.send("<script>alert('注册成功');location.href = '/';</script>"); 
				//res.send("注册成功")
				res.redirect(307,"./login");//users.js里面的login
				console.log("注册成功！");
			});
			conn.release();
		});
	},
	login:function(req,res){
		pool = connPool();

		pool.getConnection(function(err,conn){
			if(err){
				res.send('获取连接错误，错误原因：' + err.message);
				return;
			}

			var userSql = 'select uid,nicheng from user where email = ? and pwd = ?';
			var param = [req.body["email"],req.body["pwd"]];//参数获取错误就会找不到结果
			conn.query(userSql,param,function(err,rs){
				if(err){
					res.send("数据库连接错误，错误原因：" + err.message);
					return;
				}
				console.log('输出结果集：' + rs.length);
				if(rs.length > 0){
					loginbean = new loginBean();//实例化loginBean
					loginbean.id = rs[0].uid;
					loginbean.nicheng = rs[0].nicheng;
					
					req.session.loginbean = loginbean;
					res.redirect(307,'./userMain');
					
					console.log("登陆成功");
					console.log(loginbean);
				}
				else{
					res.send("email/密码错误");
				}
			});
			conn.release();
		})

	},
	signUp:function(req,res){
		//获取连接池
		pool = connPool();

		//通过连接池连接数据库
		pool.getConnection(function(err,conn){
			if(err){
				res.send('获取连接错误：' + err.message);
				console.log('获取连接错误：' + err.message);
				return;
			}
			var signupSql = "insert into signup (nicheng,sex,profession,tel,qq,interest,createtime) values (?,?,?,?,?,?,current_timestamp)";
			var param = [req.body['nicheng'],req.body['sex'],req.body['profession'],req.body['tel'],req.body['qq'],req.body['interest']];
			conn.query(signupSql,param,function(err,conn){
				if(err){
					errStr = err.message;
					//console.log(errStr);
					sendStr = '<script>';
					if(errStr.indexOf('teluiq') > -1){
						sendStr += 'alert("不能重复提交！");';
					}
					sendStr += 'history.back();</script>';
					res.send(sendStr);
					//res.send("<script>alert('联系方式/QQ必须为数字！');location.href = history.back();</script>");
					console.log('数据库：' + err.message);
					return;
				}
				res.send("<script>alert('报名成功!');location.href = history.back();</script>")
				//res.redirect(307,"/");
				console.log("报名成功！");
			})
		})
	}
}

