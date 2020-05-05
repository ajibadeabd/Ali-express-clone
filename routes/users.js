const jwt = require('jsonwebtoken')
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user')
const passport = require('passport')
const  {verifyUser} = require('../helper/Auth')



process.env.SECRET_KEY = 'secure'
/* GET users listing. */
router.get('/', function(req, res, next) {

  res.send('respond with a resource');
});

router.post('/signUp', function(req, res, next) {
  let {
    userName,
    password,
    confirm_password,
    email
  } = req.body
  if (password !== confirm_password) {
    return res.status(400).json({
      msg:'Password incorrect'
    })
    ;
  }else{
    User.findOne({
      userName:userName
    }).then((user)=>{
      if(user) {
      return res.status(400).json({
          msg:"Username already taken" 
      })
      }else{
        User.findOne({
          email:email
      })
      .then((user)=>{
        if(user) {
         return res.status(400).json({
            msg:"email  already been registerd. did you forget your password" 
        })
        
        }else{
          let newUser= new User({
            userName,
            email,
            password,
            
            userType:'user'
            })
            // console.log(newUser)
            //  hash password
             bcrypt.genSalt(10,(err,salt)=>{
              bcrypt.hash(newUser.password,salt,(err,hash)=>{
                  if(err) throw err
                  newUser.password=hash;
                  
                  newUser.save()
                  .then((user)=>{
                      
                    
                      res.status(201).json({
                          success:true,
                          msg:`i am please to inform you that  ${user.userName} successfully registerd`
                      })
                     
                    
              
                  }
                  )
                  .catch(err=>{
                      res.json({
                        error:err
                        
                      })
                  })
              })
              })

        }
      })


      }
    })
  }
  
});router.post('/signIn', function(req, res, next) {
  User.findOne({email:req.body.email})
  .then(user=>{
    if (!user) {
      return res.status(404).json({
        msg:'no email found',
        success:false
      })
    }
    bcrypt.compare(req.body.password,user.password)
  .then(ismatch=>{
      if(ismatch){ 
          const payload={
            _id:user._id,
           userName:user.userName,
            password:user.password,
            email:user.email,
            userType: user.userType
  
          }
          jwt.sign(payload,process.env.SECRET_KEY, {
              expiresIn:"1h"
  
            },(err,token)=>{
                res.status(200).json({
                      success:true,
                   token:`Bearer ${token}`   , 
                   user:user,
                    msg:"you are now logged in"
                });
              })
      }else{
         return res.status(404).json({
              success:false,
                
               msg:"incorrect password"
          })
      }
  })
  })
  
  

});
router.get('/profile',passport.authenticate('jwt',{
  session:false
}),(req,res,next) =>{
        if(req.user.userType==='user'){
          return res.status(200).json({
            msg:'loggedIn',
            user:req.user})
        }else{
          return res.status(401).json({
            msg:'unauthorize',
            user:null})
        }

  
  
})

module.exports = router;
