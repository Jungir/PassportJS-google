const express = require('express');
const authRoutes = require('./routes/auth-routes');
const profileRoutes = require('./routes/profile');
const passportSetup = require('./config/passport-setup');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const cookieSession = require('cookie-session');
const passport = require('passport');
const app = express();
app.set('view engine', 'ejs');

//connect to mongoDB
mongoose.connect(keys.mongoDB.dbURI, {useNewUrlParser: true}).then(function () {
    console.log('connected to MongoDB');
}).catch(function (err) {
    console.log(err);
});


//cookie
app.use(cookieSession({
    maxAge : 24 * 60 * 60 *1000,
    keys : [keys.session.cookieKey]
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());    

//set up routes
app.use('/auth', authRoutes);

//profile routes
app.use('/profile', profileRoutes);

//root route
app.get('/', function (req,res) {
    res.render('home', {user: req.user});
});


app.listen(3000, function () {
    console.log('up and running');
    
});