const jwt = require('jsonwebtoken')
var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/user')
const Cart = require('../models/cart')
const Order = require('../models/order')
const Category = require('../models/categoryies')
const Image = require('../models/image')
const Oda = require('../models/cart')
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
router.post('/order/:id',passport.authenticate('jwt',{
  session:false
}),(req,res,next) =>{
      const {qty}=req.body
      Oda.findOne({user:req.user.userName})
      .then(user=>{
        if (user){
          let items = user.items ;
          console.log(items.length)
    let totalQty = user.totalQty;
    let overAllPrice = user.overAllPrice ;

    Image.findOne({_id:req.params.id})
  .then(product=>{
  let storedItem= items[product._id]
  if(!storedItem) {
   let storedItem=items[product._id]={
         item:{
           name:product.name,
           image:product.url,
          owner:req.user.userName,

        },
        qty:qty,
        id:req.params.id,

        price:product.price,
        totalPrice:qty * product.price 
        
  }
  console.log(qty)
  totalQty+=qty;
  overAllPrice+=storedItem.totalPrice;}
  if(storedItem) {
       storedItem.qty += qty,
       storedItem.price=product.price,
       storedItem.item.image=product.url,
       storedItem.totalPrice=storedItem.totalPrice +(qty * product.price) 
       storedItem.id=req.params.id 

  

  totalQty+=qty ;
  overAllPrice+=(qty * product.price)
}
  

 
    
  Oda.findOne({user:req.user.userName})
  .then(user=>{
    if (user) {
      user.user=req.user.userName;
      user.items=items;
      user.totalQty=totalQty;
      user.overAllPrice=overAllPrice;
      user.save()
    }
  
      // console.log(user)
      res.status(200).json({
          success:true,
          product:user
      })
  })
  })
        }else{
    let items =  {};
    let totalQty =  0;
    let overAllPrice =  0;

    Image.findOne({_id:req.params.id})
  .then(product=>{
  let storedItem= items[product._id]
  if(!storedItem) {
    storedItem=items[product._id]={
         item:{
          name:product.name,
          image:product.url,
          owner:req.user.userName
        },
        qty:qty,
        price:product.price,
         id:req.params.id ,

        totalPrice:qty * product.price ,
  }}
  totalQty+=storedItem.qty;
   overAllPrice+=storedItem.totalPrice;
    
  Oda.findOne({user:req.user.userName})
  .then(user=>{
    
      let Order = ({
        user:req.user.userName,
        items:items,
        overAllPrice:overAllPrice,
        totalQty:totalQty,
        })
        newOrder = new Oda(Order)
      newOrder.save()
      res.status(200).json({
          success:true,
          product:user
      })
  })
  })}
  })

  
      })
router.get('/order',passport.authenticate('jwt',{
  session:false
}),(req,res,next) =>{
  Oda.find({owner:req.user.userName})
  .then(user=>{
    res.status(200).json({
      success:true,
      products:user,
      cart:user.length
    })
  })
})
router.post('/orderm/:id',passport.authenticate('jwt',{
  session:false
}),(req,res,next) =>{
 let  id=req.params.id
  console.log(req.body)
  Oda.findOne({user:req.user.userName})
  .then(user=>{
    if (user){
      let items = user.items ;
let totalQty = user.totalQty;
let overAllPrice = user.overAllPrice 
let storedItem= items[id];
// let qty=product.qty;
totalQty-=req.body.qty;
 overAllPrice-=req.body.totalPrice
//  console.log(totalQty)
//  console.log(items[product._id])
 delete items[id]
    
  // 

  Oda.findOne({user:req.user.userName})
  .then(user=>{
    
    user.user=req.user.userName
    user.items=items
    user.overAllPrice=overAllPrice
    user.totalQty=totalQty
      user.save()
      res.status(200).json({
        success:true,
        product:user
    }) 
    
    })
  // 
      }
  })
  
})
router.put('/orderUpdate/:id',passport.authenticate('jwt',{
  session:false
}),(req,res,next) =>{
  let  id=req.params.id
  console.log(id)
  console.log(req.body)
  Image.findById({_id:req.params.id})
  .then(product=>{
      price=product.price
      Oda.findOne({user:req.user.userName})
        .then(user=>{
         
      let items = user.items ;
      let totalQty = user.totalQty;
      let overAllPrice = user.overAllPrice 
      let storedItem= items[id];
      
    if(req.body.status=='inc'){
      overAllPrice+=price;
      totalQty+=1
      storedItem.qty+=1
      storedItem.totalPrice+=price
    }
    if(req.body.status=='dec'){
      overAllPrice-=price;
      totalQty-=1
      storedItem.qty-=1
      storedItem.totalPrice=price
    }
      // overAllPrice+=price;
      // totalQty+=1
      // storedItem.qty+=1
      // storedItem.totalPrice+=price
      console.log(storedItem)
      Oda.findOne({user:req.user.userName})
    .then(user=>{
      user.totalQty=totalQty;
      user.overAllPrice=overAllPrice;
      user.user=req.user.userName;
      user.items=items;
      user.save()
      res.status(201).json({
        success:true,
        product:user
      })
    })
    })
    


  })
//   Oda.findOne({user:req.user.userName})
//   .then(user=>{
//     if (user){
//       let items = user.items ;
// let totalQty = user.totalQty;
// let overAllPrice = user.overAllPrice 
// let storedItem= items[id];
// // let qty=product.qty;
// totalQty--;
//  overAllPrice-=req.body.totalPrice
// //  console.log(totalQty)
// //  console.log(items[product._id])
//  delete items[id]
    
//   // 

//   Oda.findOne({user:req.user.userName})
//   .then(user=>{
    
//     user.user=req.user.userName
//     user.items=items
//     user.overAllPrice=overAllPrice
//     user.totalQty=totalQty
//       user.save()
//       res.status(200).json({
//         success:true,
//         product:user
//     }) 
    
//     })
//   // 
//       }
//   })
})

router.get('/orderToCart/:id', passport.authenticate('jwt', {
  session: false
}),(req,res,next) =>{
  Oda.findOne({user:req.user.userName})
  .then(user=>{
      if (user){
let items = user.items;
let totalQty = user.totalQty;
let overAllPrice = user.overAllPrice;
let pId=user.pId
Order.findOne({_id:req.params.id})
.then(product=>{
let storedItem= items[product._id]
// console.log(items)
// console.log(product._id)
if(!storedItem) {
  storedItem=items[product._id]={
       item:{name:product.productName,
        owner:product.owner
      },
      qty:product.qty,
      totalPrice:product.totalPrice,
      price:product.price,
}}
 totalQty+=storedItem.qty;
 overAllPrice+=storedItem.totalPrice
 pId.push(req.params.id)
// console.log(totalQty)
// console.log(overAllPrice)

Oda.findOne({user:req.user.userName})
.then(user=>{
user.user=req.user.userName;
    user.items=items;
    user.totalQty=totalQty;
    user.overAllPrice=overAllPrice;
    user.pId=pId
    user.save()
    // console.log(user)
    res.status(200).json({
        success:true,
        product:user
    })
})
})

    
      }
      else{
let items = {};
let totalQty = 0;
let overAllPrice = 0;
// Order.findById(req.params.id)
Order.findOne({_id:req.params.id})
.then(product=>{
  // console.log(product)

  let storedItem= items[product._id]
  // console.log(items)
  // console.log(product._id)
  if(!storedItem) {
    storedItem=items[product._id]={
         item:{name:product.productName,
          owner:product.owner
        },
        qty:product.qty,
        totalPrice:product.totalPrice,
        price:product.price
  }}
   totalQty+=storedItem.qty;
   overAllPrice+=storedItem.totalPrice
  console.log(items.length)
  // console.log(overAllPrice)
  let Order = ({
    user:req.user.userName,
    items:items,
    overAllPrice:overAllPrice,
    totalQty:totalQty,
    pId:[req.params.id]
    })
    newOrder = new Oda(Order)
    newOrder.save()
})
Oda.findOne({user:req.user.userName},(err,product)=>{
  // console.log(product)
  res.status(200).json({
    success:true,
    product:product
})
})

      }
  }).catch(err=>{
      res.status(500).json({
                error:err,
      })
  })
// 


});


router.get('/deleteFromCart/:id', passport.authenticate('jwt', {
  session: false
}),(req,res,next) =>{
  Oda.findOne({user:req.user.userName})
  .then(user=>{
      if (user){
let items = user.items;
let totalQty = user.totalQty;
let overAllPrice = user.overAllPrice;

      Order.findOne({_id:req.params.id})
      .then(product=>{
      let storedItem= items[product._id];
      // let qty=product.qty;
      totalQty-=storedItem.qty;
       overAllPrice-=storedItem.totalPrice
      //  console.log(totalQty)
      //  console.log(items[product._id])
       delete items[product._id]
      //  console.log(items)
      Oda.findOne({user:req.user.userName})
.then(user=>{
user.user=req.user.userName;
    user.items=items;
    user.totalQty=totalQty;
    user.overAllPrice=overAllPrice
    user.save()
    // console.log(user)
    res.status(200).json({
        success:true,
        product:user
    })
})

      })
     


    }


})
})
//get all order
router.get('/allOrder',passport.authenticate('jwt', {
  session: false
}),(req,res,next) =>{
    console.log('product')

  Oda.findOne({user:req.user.userName})
  .then(product=>{
    res.status(200).json({
      success:true,
      product:product,
      jj:'kk',
      // cart:product.length
      // items:product.items,

  })
  })
})


//delete all image
router.get('/image',(req,res,next) =>{
    console.log('product')

  User.deleteMany()
  .then(product=>{
    res.status(200).json({
      success:true,
      product:product
  })
  })
})



module.exports = router;
