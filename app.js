var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const methodOverride = require('method-override');
const session = require('express-session');



var mainRouter = require('./src/routes/main.routes');
var usersRouter = require('./src/routes/users.routes');
// var carritoRouter = require("./src/routes/carrito.routes");
var productsRouter = require("./src/routes/products.routes");
var usersApiRouter = require('./src/Routes/api/usersApiRoutes');
var productsApiRouter = require('./src/Routes/api/productsApiRoutes');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride("_method"));

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', mainRouter);
app.use("/productos", productsRouter);
// app.use("/carrito", carritoRouter);
app.use('/usuario', usersRouter);
app.use('/api/users', usersApiRouter);
app.use('/api/products', productsApiRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

{/* <a href="<%= req.session.usuarioLogueado? 'homeUser' : '/' %>"><img class="lgo-simple" src="/Images/lgo_simple.svg" alt="Logo de marca"></a> */}
