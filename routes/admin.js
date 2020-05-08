var express = require('express');
var router = express.Router();
const path = require('path')
const multer = require('multer')
const cloudinary=require("../cloudinary")
const Images=require("../models/image")
const Admin=require("../models/admin")
const Category=require("../models/categoryies")
const jwt = require('jsonwebtoken')

const fs =require("fs")

const bcrypt = require('bcryptjs');
const passport = require('passport')


const storage = multer.diskStorage(
  {destination:"./public/uploads/",
  filename:(req,file,cb)=>{
      cb(null,file.fieldname + "-"+ Date.now()+
      path.extname(file.originalname))
  }}
)

//init uload
const upload=multer({
  storage:storage,
  limits:{fileSize:100000000},
  fileFilter:(req,file,cb)=>{
      checkFileType(file,cb)

  }
})

//check file type
checkFileType=(file,cb)=>{
  //allowe exit
  const filetypes = /jpeg|jpg|png|gif/;
  // check ext
  const extname= filetypes.test(path.extname(file.originalname)
  .toLowerCase())

  //check mime
  const mimetype = filetypes.test(file.mimetype) 

  if(mimetype && extname){
      return cb(null,true)
  }else{
      cb('Error:Images only!')
  }
}









/* GET home page. */  
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

  router.post('/uploadFile', upload.array("files") , async function(req, res, next) {
  // res.json({
    console.log(req.files)
    const uploader =  async (path)=> await cloudinary.uploads(path,'files')
    // if(req.method==='POST')
    // {
        const urls =[]
            const files = req.files
            for(file of files){
                const {originalname,path}=file
                const newPath= await uploader(path)
                console.log(originalname)

                
            // }
            if (!newPath.url && !newPath.id ) {
              
              res.status(400).json({
                message:
'image was not uploaded successfully due to network',
                // data:urls
                error:'image was not uploaded successfully due to network'

            })
            }else{
              urls.push(newPath)
                fs.unlinkSync(path)
                newImage = {
                  url : newPath.url,
                  id : newPath.id,
                  name : originalname,
                  price: '',
                  description: '',
                  category: ''
                }
              Images(newImage).save().then(data=>{
                res.status(200).json({
                  message:'images uploaded successfully',
                  data:data
              })
              })
            }}
            
   
        
        
  
});
// gett All images save on the cloud
router.get('/getUploadedFile', async function(req, res, next) {
 Images.find()
 .then(images=>{
   res.status(200).json({
     images:images,
     success:true
   })
 }) .catch(err=>{
  console.log(err)
})



});
// gett each images save on the cloud
router.get('/getUploadedFile/:id', async function(req, res, next) {
  Images.findOne({_id:req.params.id})
  .then(image=>{
    res.status(200).json({
      image:image,
     success:true

    })
  }).catch(err=>{
    console.log(err)
  })
   
 });

 

// gett each images save on the cloud
router.put('/editUploadedFile/:id', async function(req, res, next) {
  
  Images.findOneAndUpdate(
    {_id:req.params.id} 
    ,req.body,

    {new:true},
    (err,image)=>{
            if(err) res.send(err);
            res.status(200).json(
            {
              image,
              success:true
            }
             ) 
    });
 });
// route for admin to add categories
 router.post('/postCategories', async function(req, res, next) {
   let category=req.body.category
      Category.findOne({title:category})
      .then(categories=>{
        if (!categories) {

          let newCat = new Category({title:category})
      newCat.save()
      return res.status(201).json({
        msg:'category created',
        success:true
      })
          
    }else{
      
      return res.status(400).json({
        msg:'category already exist before',
        success:false
  })
    }
 });
 })
// fetch all categories
 router.get('/getCategories', async function(req, res, next) {
      Category.find()
      .then(cat=>{
        return res.status(200).json({
          count:cat.length,
          cat,
          success:true
        })
      })

 })

 //route to sign in an admin by the superAdmin
router.post('/signIn', function(req, res, next) {
  Admin.findOne({email:req.body.email})
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
        if(req.user.userType==='admin' ){
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
