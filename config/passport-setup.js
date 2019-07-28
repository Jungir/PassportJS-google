const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20');
const keys = require('./keys');
const User = require('../models/user-model');

// serialize User
passport.serializeUser((user, done) => {
    //user object from passport
    //null is an errow
    done(null, user.id);
    //after done we pass info to the cookie

});

//desirialize User
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

passport.use(new GoogleStrategy({
    // options for the google strategy
    callbackURL:'/auth/google/redirect',
    clientID: keys.google.clientID,
    clientSecret: keys.google.clientSecret
}, function (accessToken, refreshToken, profile, done) {
    //passport callback function
    // console.log(profile);
    User.findOne({googleId : profile.id}).then(function (curUser) {
        if(curUser){
            // console.log('already have that user'+ curUser);
            //go to the next phase serializing user
            done(null, curUser);

        }else{
            User.create({username: profile.displayName, googleId : profile.id, thumbnail:profile._json.picture}).then(function (savedData) {
                //serializing method
                done(null, savedData);
            }).catch(function (err) {console.log(err);});
        }
    });

    
      
    
})
);