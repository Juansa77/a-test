const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose'); 

//* RECUERDA QUE EL PASSWORD LO GESTIONA PASSPORT
  
const UserSchema = new Schema({    
    email: {type: String, required:true, unique:true}, 
    username:{type:String, required:true}
}); 
  
//* plugin for passport-local-mongoose 
UserSchema.plugin(passportLocalMongoose); 
  
//* export userschema 
 module.exports = mongoose.model("User", UserSchema); 