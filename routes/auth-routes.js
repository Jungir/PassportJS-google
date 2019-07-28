const router = require ('express').Router();
const passport = require('passport');

//auth login
router.get('/login', function (req, res) {
    res.render('login');
    
});

//auth logout
router.get('/logout', function (req, res) {
    //handle with passport
    req.logOut();
    res.redirect('/');
});

//auth with google
router.get('/google', passport.authenticate('google', {
    //handle with passport 
    //scope what we want to retrieve from profile
    scope: ['profile']
})
);

//took the data from prev route and then again connecting to google to get the profile info, then we make a call to the passport callback function to create a 'user' and then the done f() is triggered, now we can proceed to the 3rd parameter with req/res funct
router.get('/google/redirect', passport.authenticate('google'), function (req, res) {
    res.redirect('/profile');
})

module.exports = router;