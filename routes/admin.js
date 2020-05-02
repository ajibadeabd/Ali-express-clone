var express = require('express');
var router = express.Router();
const path = require('path')
const multer = require('multer')
const cloudinary=require("../cloudinary")
const Images=require("../models/image")
const fs =require("fs")


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
  limits:{fileSize:100000000000000000000000},
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
    // console.log(req.files)
    const uploader =  async (path)=> await cloudinary.uploads(path,'files')
    // if(req.method==='POST')
    // {
        const urls =[]
            const files = req.files
            for(file of files){
                const {path}=file
                const newPath= await uploader(path)
                console.log(newPath)

                
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
                }
              Images(newImage).save().then(data=>{
                res.status(200).json({
                  message:'images uploaded successfully',
                  data:data
              })
              })
            }}
            
   
        
        
  
});
// gett All image
router.get('/getUploadedFile', async function(req, res, next) {
 Images.find()
 .then(image=>{
   res.json({
     images:image
   })
 })
  
});

module.exports = router;
