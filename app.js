var express = require('express');
var path = require('path');

var app = express();

// view engine setup
// ############# View Template Engine START ############# //
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
// ############# View Template Engine END ############# //


// ############# logger START ############# //
var logger = require('morgan');
app.use(logger('dev'));
// ############# logger END ############# //


// ############# Cookie START ############# //
var cookieParser = require('cookie-parser');
app.use(cookieParser());
// ############# Cookie END ############# //


// ############# Static START ############# //
app.use('/web', express.static(path.join(__dirname, 'public')));
// ############# Static END ############# //


// ############# body 解析 START ############# //
let bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())
// ############# body 解析 END ############# //


// ############# Upload START ############# //
let fileupload = require('express-fileupload')
app.use(fileupload({
    limits: { fileSize: 50 * 1024 * 1024 },
    useTempFiles : true,
    tempFileDir : `${__dirname}/files/tmp/`
}))
// ############# Upload END ############# //


// ############# 注册路由 START ############# //
app.use(require('./routes'))
// ############# 注册路由 END ############# //


// ############# 错误处理 START ############# //
// 404 错误处理
var createError = require('http-errors');
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
// 异常处理
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  // res.render('error');
  res.json({
    'code': res.status,
    'msg': err.message
  })
});
// 全局异常捕获
process.on('unhandledRejection', rej => console.warn('全局捕获Rejection', rej));
// ############# 错误处理 END ############# //


// ############# 自定义拦截器 START ############# //
// 中间件：拦截器
app.use((req, res, next)=>{
  console.log("[intercept]req: ", req.url)
  console.log("[intercept]req.cookies: ", req.cookies)
  next()
})
// ############# 自定义拦截器 END ############# //

module.exports = app;
