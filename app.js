var express = require('express');
var ejs = require('ejs');
var database = require('./database');
var pool = database.pool;
var connect = require('connect');
var md5 = require('./md5');
var request = require('request');
var request = request.defaults({jar : true});
var app = express();

var store = new express.session.MemoryStore;


app.configure(function(){
	app.use(express.bodyParser());
	app.use(express.methodOverride());
	app.use(express.cookieParser());
	app.use(express.session({
		store: store, // use it as your store
		secret: '386839406',
		cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 week
	}));
});

app.get('/', function(req,res) {
	var body = 'Hello World';
	if (req.session.userinfo) {
		res.redirect('/manage');
	} else {
		res.sendfile('./views/index.html');
	}
});

app.get('/views/libs/:filename', function(req,res) {
	res.sendfile('./views/libs/' + req.params.filename);
});

app.post('/login', function(req,res) {
	var password = req.body.password;
	pool.getConnection(function(err,connection) {
		if (err) throw err;
		var username = req.body.username;
		var password = req.body.password;
		connection.query('SELECT * FROM users WHERE username=?' ,username, function(err, results){
			connection.release();
			if (results.length > 0 && results[0].password == password) {
				req.session.userinfo = results[0];
				res.redirect('/manage');
			} else {
				res.send('Login failed, please check your username and password.');
			}
		});
	});
});

app.get('/manage',function(req,res) {
	if (req.session.userinfo) {
		var username = req.session.userinfo['username'];
		res.render('manage.ejs',{username: username});
	} else {
		res.redirect('/');
	}
});

app.get('/reset', function(req,res) {
	if (req.session.userinfo) {
		var userinfo = req.session.userinfo;
		var tel = userinfo.tel;
		var secret_key = md5.hex_md5(userinfo.secret);
		var s = new Date;
		var time = s.getTime();
		var ip = ipreset(tel,secret_key,time,req,res);

	} else {
		res.redirect('/');
	}
});


app.get('/ip', function(req,res) {
	if (req.session.userinfo) {
		var userinfo = req.session.userinfo;
		var userid = userinfo.tel;
		var secret = md5.hex_md5(userinfo.secret);
		var s = new Date;
		var time = s.getTime();
		var url = 'https://user.hiwifi.com/sso/login?userid=' + 
		userid +'&passwd=' + secret+'&t=' + time + '&domain=hiwifi.com&method=2&p=0';
		var j = request.jar();
		request.post({url: url, jar : j}, function(error, response, body){
			var cookie_string = j.getCookieString(url);
			request.get({url : 'https://app.hiwifi.com/store.php',jar :j}, function(error, response, body){
				var path = response.req.path;
				/rid=(\d+)/.test(path)
				var rid = RegExp.$1;
				request.get({url: 'https://app.hiwifi.com/store.php?m=router&a=info&rid=' + rid,
							 jar :j }, function(error,response,body) {
					/\<li\>\<span\>在线IP：\<\/span\>(.*)\<\/li\>/.test(body);
					var ip = RegExp.$1;
					console.log(ip);
					res.send(ip);
				});
			});
		});
	}
});

app.listen(3000);
console.log("Listening on port 3000");

app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.send(500, 'Something Broke!');
});


function ipreset(userid,secret,time,req,res){
	var url = 'https://user.hiwifi.com/sso/login?userid=' + 
	userid +'&passwd=' + secret+'&t=' + time + '&domain=hiwifi.com&method=2&p=0';
	var j = request.jar();
	request.post({url: url, jar : j}, function(error, response, body){
		var cookie_string = j.getCookieString(url);
		request.get({url : 'https://app.hiwifi.com/store.php',jar :j}, function(error, response, body){
			var path = response.req.path;
			/rid=(\d+)/.test(path)
			var rid = RegExp.$1;
			request.get({url: 'https://app.hiwifi.com/store.php?m=router&a=info&rid=' + rid,
						 jar :j }, function(error,response,body) {
				/\<li\>\<span\>在线IP：\<\/span\>(.*)\<\/li\>/.test(body);
				var ip = RegExp.$1;
				console.log(ip);
				form_ = {'username':'admin','password':'i35660'};
				var url = 'http://' + ip + ':1616/cgi-bin/turbo/admin_web';
				console.log(url);
				var j2 = request.jar();
				request.post({url: url, jar:j2, form: {'username': form_['username'], 'password' : form_['password']}},function(error,response,body) {
					/\/;stok=(.*)\/admin_web/.test(body);
					var _stok = RegExp.$1;
					console.log(_stok);
					request.get({url: 'http://'+ ip +':1616/cgi-bin/turbo/;stok=' + _stok + '/api/system/reboot', jar:j2}, function(error,response, body) {
						// 78e408c10980da88633505965b327516
						// f40d5a90af1df6412ea388889d96e6eb
						console.log(body);
						console.log(j2.getCookieString('http://'+ ip +':1616/cgi-bin/turbo/;stok=' + _stok + '/api/system/reboot'));
						res.send('success');
					});
				});
			});

		});
	});
}



























