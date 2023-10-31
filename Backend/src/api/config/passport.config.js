const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User= require("../models/user.model")

 const passportConfig=()=> {
  // Serialize and deserialize user
  passport.serializeUser(User.serializeUser());
  passport.deserializeUser(User.deserializeUser());

  // Local strategy for login
  passport.use(new LocalStrategy(User.authenticate()));
};

module.exports= passportConfig