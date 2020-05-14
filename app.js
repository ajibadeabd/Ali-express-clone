var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var logger = require('morgan');
const passport = require('passport')
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require("connect-mongo")(session);
var app = express();

//map global promise - get rid of warning
mongoose.promise=global.promise;

require('./config/passport')(passport)
const db = require('./config/database')
// mongoose.connect( 'mongodb://localhost/Ali_express_clone',
  
// mongoose.connect( 'mongodb+srv://user:user@cluster0-ha9ym.mongodb.net/test?retryWrites=true&w=majority',
mongoose.connect( db.mongoURL,

{useNewUrlParser:true,
  useUnifiedTopology: true 
})
.then(()=> console.log(' DB connected'))
.catch((err) => console.log(err));
// mongoose.connect( db.mongoURL[0],
//   {useNewUrlParser:true})
//   .then(()=> console.log(db.mongoURL[1]))
//   .catch((err) => console.log(err));
  
var adminRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var imageRouter = require('./routes/image');

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
app.use(session({
  secret:'anything',
  resave:false,
  saveUninitialized:false,
  store:new MongoStore({
     mongooseConnection:mongoose.connection
    }),
  cookie:{maxAge:180*60*1000}
}));

app.use('/admin', adminRouter);
app.use('/users', usersRouter);
app.use('/image', imageRouter);
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
  res.locals.session= res.session;
  
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
