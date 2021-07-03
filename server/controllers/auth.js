require('dotenv').config();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { createJWT } = require("../utils/auth");
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
exports.signup = (req, res, next) => {
  let { name, email, password } = req.body;
  let errors = [];
  if (!name) {
    errors.push( "Name is required" );
  }
  if (!email) {
    errors.push("Email is required" );
  }
  if (!emailRegexp.test(email)) {
    errors.push( "Invalid Email" );
  }
  if (!password) {
    errors.push( "Password is required" );
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }
 User.findOne({email: email})
    .then(user=>{
       if(user){
          return res.status(422).json({ errors: [ "Email already exists" ] });
       }else {
         const user = new User({
           name: name,
           email: email,
           password: password
         });
 bcrypt.genSalt(10, function(err, salt) { bcrypt.hash(password, salt, function(err, hash) {
         if (err) throw err;
         user.password = hash;
         user.save()
             .then(response => {
                res.status(200).json({
                  success: true,
                  result: response
                })
             })
             .catch(err => {
               res.status(500).json({
                  errors: [{ error: err.errmsg }]
               });
            });
         });
      });
     }
  }).catch(err =>{
      res.status(500).json({
        errors: ['Something went wrong']
      });
  })
}
exports.signin = (req, res) => {
     let { email, password } = req.body;
     let errors = [];
     if (!email) {
      errors.push(" Email is required " );
     }
     if (!emailRegexp.test(email)) {
      errors.push(" Invalid Email " );
     }
     if (!password) {
      errors.push(" Password is required " );
     }
     if (errors.length > 0) {
      return res.status(422).json({ errors: errors });
     }
     User.findOne({ email: email }).then(user => {
        if (!user) {
          return res.status(404).json({
            errors: [" User not found "],
          });
        } else {
           bcrypt.compare(password, user.password).then(isMatch => {
              if (!isMatch) {
               return res.status(400).json({ errors: [" Incorrect Password "] 
               });
              }
       let access_token = createJWT(
          user.email,
          user._id,
          3600
       );
       jwt.verify(access_token, "" + process.env.TOKEN_SECRET, (err,
decoded) => {
         if (err) {
            res.status(500).json({ errors: err });
         }
         if (decoded) {
             return res.status(200).json({
                success: true,
                token: access_token,
                message: user
             });
           }
         });
        }).catch(err => {
          res.status(500).json({ errors: err });
        });
      }
   }).catch(err => {
      res.status(500).json({ errors: err  });
   });
}
