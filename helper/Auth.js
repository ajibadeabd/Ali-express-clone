module.exports ={


 verifyUser: function(req,res,next){

            
      
            if (req.user.userType='user') {
                return res.status(400).json({
                    success_message:'un authorize user',
                    status:'error'
                  })
        
         


}


}}








// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// const User  = require("../models/user");
// // const key = 'secure'
// // const key = require('./keys').secret;
// const key = require('../config/keys').secret
// const security = {}
// security.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// security.secretOrKey=key
// module.exports = checkUserType => {
//   let me=  passport.use(
//         new JwtStrategy(security,(jwt_payload,done) => {
//             User.findById(jwt_payload.userType)
//             .then(user=> {
//                 if (user)
//                 console.log(user)
//                 return done(null,user)
//                 return done(null,false)
//             })
//             .catch(err=>{
//                 console.log(err)
//             })
//         })
//     )
    
// } 
























// // const jwt = require('jsonwebtoken');
// // const ExtractJwt = require('passport-jwt').ExtractJwt;
// // const jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();



// // module.exports =  JwtStrategy(jwtFromRequest,'secure',(jwt_payload,done) => {}


  
 

// // }
//     // verifyloggedin:function(req,res,next){

//       //  try{
//           // const decoded = jwt.decode(req.body.token,'secure')
//           // JwtStrategy(jwtFromRequest,'secure',(jwt_payload,done) => {}
//           // console.log(jwtFromRequest)
       
//       // if (  req.user.userType = 'user') {
//       //     // next()
//       //     res.json({
//       //       success_message:'authorize user',
//       //               user:req.user,
//       //     })
         
//       //    }else{
//       //     return res.status(400).json({
//       //        err_message:'unauthorize user',
             
//       //      })
//       //    }
//     // },
//     //  verifyUser: function(req,res,next){

            
//     //     if (  req.isAuthenticated() ) {
//     //         if (req.user.userType = 'user') {
//     //             return res.status(201).json({
//     //                 success_message:'authorize user',
//     //                 user:req.user,
//     //                 type:req.user.userType
//     //               })
//     //         }
           
//     //        }else{
//     //         return res.status(400).json({
//     //            err_message:'unauthorize user',
               
//     //          })
//     //        }
//     //   },
      
//     //  verifyAdmin: function(req,res,next){

            
//     //     if (  req.isAuthenticated() ) {
//     //         if (req.user.userType = 'admin') {
//     //             return res.status(201).json({
//     //                 success_message:'authorize admin',
//     //                 user:req.user,
//     //                 type:req.user.userType
//     //               })
//     //         }
           
//     //        }else{
//     //         return res.status(400).json({
//     //            err_message:'unauthorize admin',
               
//     //          })
//     //        }
//     //   },
      
//     //  verifySchool: function(req,res,next){

            
//     //     if (  req.isAuthenticated() ) {
//     //         if (req.user.userType = 'school') {
//     //             return res.status(201).json({
//     //                 success_message:'authorize school',
//     //                 user:req.user,
//     //                 type:req.user.userType
//     //               })
//     //         }
           
//     //        }else{
//     //         return res.status(400).json({
//     //            err_message:'unauthorize school',
               
//     //          })
//     //        }
       
//     //   },
// // }    