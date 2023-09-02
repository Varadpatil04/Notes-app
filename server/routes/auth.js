const express = require('express');
const router = express.Router();
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/User');


passport.use(
  new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
  },
    async function (accessToken, refreshToken, profile, done) {
      // console.log(profile);
      const newUser = {
        googleID: profile.id,
        displayName: profile.displayName,
        firstName: profile.name.givenName,
        lastName: profile.name.familyName,
        profileImage: profile.photos[0].value
      }
      try {
        // check if user already exists in our db with the same email as the one from google
        let user = await User.findOne({
          googleID: profile.id
        });
        if (user) {
          done(null, user)
        } else {
          user = await User.create(newUser);
          done(null, user);
        }
      } catch (error) {
        console.log(error)
      }
    }
  )
);


router.get('/auth/google',
  passport.authenticate('google', { scope: ['email', 'profile'] },
  ));

router.get('/auth/google/callback',
  passport.authenticate('google',{
    failureRedirect: '/login-fail',
    successRedirect: '/dashboard'
  }),
);

// Destroy user session
router.get('/logout', (req, res) => {
  req.session.destroy(error => {
    if(error) {
      console.log(error);
      res.send('Error loggin out');
    } else {
      res.redirect('/')
    }
  })
});

router.get('/login-fail', (req, res) => {
  res.send("Error Has occured Try Again later")
})


// presist uder data aafter succesfull authetication 
passport.serializeUser(function (user, done) {
  done = (null, user.id)
})



// retrive user data from session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = router;