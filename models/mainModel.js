var connPool = require('../models/connPool.js');

module.exports = {
	//添加信息到对应的数据库
	bookDetails:function(req,res){
		//首先获取数据库连接池
		pool = connPool();

		//通过pool连接数据库
		//
		pool.getConnection(function(err,conn){
			if(err){
				res.send('获取连接错误：' + err.message);
				return;
			}
			var bookSql = 'insert into book (bname,author,num,address,createtime) values (?,?,?,?,current_timestamp)';
			var param = [req.body['bname'],req.body['author'],req.body['num'],req.body['address']];
			conn.query(bookSql,param,function(err,conn){
				if(err){
					console.log("数据库：" + err.message);
					return;
				}
				else{
					res.send("<script> alert('添加成功！');location.href = './addLogin';</script>");
					//res.redirect(307,'./addLogin');
					
					console.log('添加成功');
				}
				
			})
			conn.release();
		});

	},
	componentsDetails:function(req,res){
		//首先获取数据库连接池
		pool = connPool();
		//通过pool连接数据库
		pool.getConnection(function(err,conn){
			if(err){
				console.log('获取连接错误：' + err.message);
				return;
			}
			var componentsSql = 'insert into components (cname,num,address,createtime) values (?,?,?,current_timestamp)';
			var param = [req.body['cname'],req.body['num'],req.body['address']];
			conn.query(componentsSql,param,function(err,conn){
				if(err){
					res.send("数据库：" + err.message);
					console.log("数据库：" + err.message);
					return;
				}
				else{
					res.send("<script> alert('添加成功！');location.href = './addLogin';</script>");
					//res.redirect(307,'./addLogin');
					
					console.log('添加成功');
				}
			});
			conn.release();
		});
	},
	moneyDetails:function(req,res){
		//首先获取连接池
		pool = connPool();

		//通过pool连接数据库
		pool.getConnection(function(err,conn){
			if(err){
				console.log('获取连接错误：' + err.message);
				return;
			}
			var moneySql = 'insert into money (amount,uses,time,createtime) values(?,?,?,current_timestamp)';
			var param = [req.body['amount'],req.body['uses'],req.body['time']];
			conn.query(moneySql,param,function(err,conn){
				if(err){
					console.log("数据库：" + err.message);
					return;
				}
				else{
					res.send("<script> alert('添加成功！');location.href = './addLogin';</script>");
					//res.redirect(307,'./addLogin');
					console.log('添加成功');
				}
			});
			conn.release();
		});
	},
	//信息的获取并且显示到前端
	bookContent:function(req,res){
		pool = connPool();
		//通过连接池pool连接数据库
		pool.getConnection(function(err,conn){
			if(err){
				res.send("连接错误：" + err.message);
				console.log("连接错误：" + err.message);
				return;
			}
			var bookSql = "select bname,author,num,address from book";
			conn.query(bookSql,function(err,rs){
				if(err){
					res.send(err.message);
					console.log(err.message);
					return;
				}
				if(rs.length > 0){
					res.send(rs);
				}
				else{
					res.send(err.message);
					console.log(err.message);
					return;
				}
				//res.send(rs);
				//console.log(rs);
			});
			conn.release();
		})
	},
	componentContent:function(req,res){
		pool = connPool();
		//通过连接池pool连接数据库
		pool.getConnection(function(err,conn){
			if(err){
				res.send("连接错误：" + err.message);
				console.log("连接错误：" + err.message);
				return;
			}
			var componentSql = "select cname,num,address from components";
			conn.query(componentSql,function(err,rs){
				if(err){
					res.send(err.message);
					console.log(err.message);
					return;
				}
				if(rs.length > 0){
					res.send(rs);
				}
				else{
					res.send(err.message);
					console.log(err.message);
					return;
				}
				//res.send(rs);
				//console.log(rs);
			});
			conn.release();
		})
	},
	moneyContent:function(req,res){
		pool = connPool();
		//通过连接池pool连接数据库
		pool.getConnection(function(err,conn){
			if(err){
				res.send("连接错误：" + err.message);
				console.log("连接错误：" + err.message);
				return;
			}
			var moneySql = "select amount,uses,time from money";
			conn.query(moneySql,function(err,rs){
				if(err){
					res.send(err.message);
					console.log(err.message);
					return;
				}
				if(rs.length > 0){
					res.send(rs);
				}
				else{
					res.send(err.message);
					console.log(err.message);
					return;
				}
				//res.send(rs);
				//console.log(rs);
			});
			conn.release();
		})
	},
	signUpInfo:function(req,res){
		//获取连接池
		pool = connPool();
		//通过连接池连接数据库
		pool.getConnection(function(err,conn){
			if(err){
				res.send("连接错误：" + err.message);
				console.log("连接错误：" + err.message);
				return;
			}
			var signUpInfoSql = "select nicheng,sex,profession,tel,qq,interest from signup";
			conn.query(signUpInfoSql,function(err,rs){
				if(err){
					res.send(err.message);
					console.log(err.message);
					return;
				}
				if(rs.length > 0){
					res.send(rs);
				}
				else{
					res.send(err.message);
					console.log(err.message);
					return;
				}
			})
			conn.release();
		})
	},
	//借书情况
	borrow_books:function(req,res){
		//获取连接池
		pool = connPool();
		//通过连接池连接数据库
		pool.getConnection(function(err,conn){
			if(err){
				res.send("<script> alert(err.message);</script>");
				console.log("连接错误：" + err.message);
				return;
			}
			//console.log("能执行到这一步：this is true!");
			var borrow_booksSql = "insert into borrow_book (bname,name,tel,createtime) values(?,?,?,current_timestamp)";
			//var book_amount = "select num from book where num = ?";
			var param = [req.body['bname'],req.body['name'],req.body['tel']];
			conn.query(borrow_booksSql,param,function(err,rs){
				if(err){
					res.send("数据库：" + err.message);
					console.log("数据库：" + err.message);
				}
				/*else if(book_amount)*/
				
				res.send("<script> alert('借书成功');window.location.href = './book';</script>");
				//res.redirect(307,"./userMain");

			})
			/*var borrow_booksSql = "select * from book where bname = ?";
			var param = req.body['bname'];
			conn.query(borrow_books,param,function(err,rs){
				if(err){
					res.send("查询错误：" + err.message);
					console.log(err.message);
					return;
				}
				else if(rs.length > 0){
					console.log(rs);
					res.send(rs);
				}
				else{
					res.send("书籍已被借阅完！");
				}
			});*/
			conn.release();


		})
	},
	borrow_components:function(req,res){
		//获取连接池
		pool = connPool();
		//通过数据库连接连接池
		pool.getConnection(function(err,conn){
			if(err){
				res.send("<script> alert(err.message);</script>");
				console.log(err.message);
				return;
			}
			var componentsSql = "insert into borrow_components (cname,name,tel,createtime) values (?,?,?,current_timestamp)";
			var param = [req.body['cname'],req.body['name'],req.body['tel']];
			conn.query(componentsSql,param,function(err,rs){
				if(err){
					res.send("数据库：" + err.message);
					console.log("数据库：" + err.message);
				}
				res.send("<script> alert('借元器件成功！');location.href = './mains';</script>")
			})
		})
	},
	//还书
	back_book:function(req,res){
		//获取连接池
		pool = connPool();
		//连接数据库
		pool.getConnection(function(err,conn){
			if(err){
				res.send("数据库连接错误：" + err.message);
				console.log("数据库连接错误：" + err.message);
				return;
			}
			var back_bookSql = "delete from borrow_book where bname = ? and name = ?";
			var param = [req.body['bname'],req.body['name']];
			conn.query(back_bookSql,param,function(err,rs){
				if(err){
					res.send("数据库查询错误：" + err.message);
					console.log("数据库查询错误：" + err.message);
					return;
				}
				console.log("输出的信息为：" + rs);
				if(rs){
					res.send("<script> alert('还书成功！');location.href = './book';</script>");
					console.log('还书成功！');
				}
				/*else{
					res.send("<script> alert('还书失败/该书不存在！');location.href = './userMain';</script>");
				}
				/*else{
					res.send(rs);
					console.log("删除成功！");
					res.redirect(307,"./userMain");
					6 
				}*/
				
			});
			conn.release();
		})
	},
	back_component:function(req,res){
		//获取连接池
		pool = connPool();
		//连接数据库
		pool.getConnection(function(err,conn){
			if(err){
				res.send("数据库连接错误：" + err.message);
				console.log("数据库连接错误：" + err.message);
				return;
			}
			var back_componentsSql = "delete from borrow_components where cname = ? and name = ?";
			var param = [req.body['cname'],req.body['name']];
			conn.query(back_componentsSql,param,function(err,rs){
				if(err){
					res.send("数据库查询错误：" + err.message);
					console.log("数据库查询错误：" + err.message);
					return;
				}
				console.log("输出的信息为：" + rs);
				if(rs){
					res.send("<script> alert('还元器件成功！');location.href = './component';</script>");
					console.log('还元器件成功！');
				}
				/*else{
					res.send("<script> alert('还书失败/该书不存在！');location.href = './userMain';</script>");
				}
				/*else{
					res.send(rs);
					console.log("删除成功！");
					res.redirect(307,"./userMain");
					
				}*/
				
			});
			conn.release();
		})
	},
	info_book:function(req,res){
		//获取连接池
		pool = connPool();
		//通过连接池连接数据库
		pool.getConnection(function(err,conn){
			if(err){
				res.send("连接错误：" + err.message);
				console.log("连接错误：" + err.message);
				return;
			}
			var info_bookSql = "select bname,name,tel from borrow_book";
			conn.query(info_bookSql,function(err,rs){
				if(err){
					res.send("数据库查询错误：" + err.message);
					console.log("数据库查询错误：" + err.message);
					return;
				}
				res.send(rs);
				return;
				
			});
			conn.release();
		})

	},
	info_components:function(req,res){
		//获取连接池
		pool = connPool();
		//通过连接池连接数据库
		pool.getConnection(function(err,conn){
			if(err){
				res.send("连接错误：" + err.message);
				console.log("连接错误：" + err.message);
				return;
			}
			var info_componentsSql = "select cname,name,tel from borrow_components";
			conn.query(info_componentsSql,function(err,rs){
				if(err){
					res.send("数据库查询错误：" + err.message);
					console.log("数据库查询错误：" + err.message);
					return;
				}

				res.send(rs);
				return;
			});
			conn.release();
		})	
	}
}