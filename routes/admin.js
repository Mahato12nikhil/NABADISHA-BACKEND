const adminController = require('../controller/admin')
const router = require('express').Router();
const { body } = require('express-validator')
const validateUser=require('../middleware/validateuser')

router.post('/login',[
    body('email')
        .isEmail()
    ,
    body('password')
        .trim()
        .isLength({min:5})

],adminController.login)

router.post('/gallery',validateUser,[
    body('title')
    .not()
    .isEmpty()
    ,
    body('description')
    .not()
    .isEmpty(),
    body('image')
    .not()
    .isEmpty()
    ],adminController.uploadGallery)

     
 router.post('/activity',validateUser,[
        body('title')
        .not()
        .isEmpty()
        ,
        body('description')
        .not()
        .isEmpty(),
        body('image')
        .not()
        .isEmpty()],adminController.AddActivity)
        
module.exports=router

