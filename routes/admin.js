var express = require('express');
var router = express.Router();
const path = require('path')
const multer = require('multer')



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

  router.post('/uploadFile', upload.single("files") , async function(req, res, next) {
  // res.json({
    console.log(req.file)
        
            const urls =[]
                const files = req.files
                for(file of files){
                    const {path}=file
                    const newPath= await uploader(path)
                    urls.push(newPath)
                    fs.unlinkSync(path)
                }
        res.status(200).json({
            message:'images uploaded successfully',
            data:urls
        })
  
});


module.exports = router;
