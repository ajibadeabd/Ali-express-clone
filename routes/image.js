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






//display all products in a specific Category
router.get('/:category', function (req, res, next) {
    Category.findOne({title: req.params.category}, function (err, category) {

        if (err) {
            return res.status(404).json({
                msg:'image not found',
                success:false
            })
        }else{
            Images.find({category: category.title}, function(err, products) {
                if(err) return console.log(err);
                res.status(200).json(products);
            });
        }
    });
  });
  
  




module.exports = router;
