const cloudinary = require('cloudinary');
 const dotenv = require('dotenv')
 dotenv.config()
 cloudinary.config({
     cloud_name:process.env.CLOUD_NAME,
     api_key:process.env.CLOUDINARY_API_KEY,
     api_secret:process.env.CLOUDINARY_API_SECRET
 })

 //it a function

 exports.uploads = (file,folder)=>{
// console.log(cloud_name)
      return new Promise(resolve=>{
         cloudinary.uploader.upload(file,(result)=>{
             resolve({
                 url:result.url,
                 id:result.public_id 
             })
        
          } ,{
            resourse_type:"auto",
            folder:folder
        })
      })

 }