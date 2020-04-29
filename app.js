var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const passport = require('passport')
const mongoose = require('mongoose');
var app = express();

//map global promise - get rid of warning
mongoose.promise=global.promise;
// mongoose.connect( 'mongodb://localhost/Ali_express_clone',
  
mongoose.connect( 'mongodb+srv://user:user@cluster0-ha9ym.mongodb.net/test?retryWrites=true&w=majority',
{useNewUrlParser:true,
  useUnifiedTopology: true 
})
.then(()=> console.log(' DB connected'))
.catch((err) => console.log(err));
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');

const cors = require('cors')

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');
app.use(cors());
app.use(passport.initialize())
require("./config/passport")(passport)

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname,'public/index.html'))
  })
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
