const authController = require('../controller/auth')
const router = require('express').Router();
const { body } = require('express-validator')
//const User = require('../Model/User')

//Singup route
router.post('/signup',[
    body('email')
        .isEmail()
        .withMessage('Please enter valid mail address')
        .normalizeEmail()
    ,
    body('password')
        .trim()
        .isLength({min:5}),
    body('name')
        .not()
        .isEmpty(),
    body('image').
      not()
      .isEmpty() ,
      body('phone')
      .trim()
        .isLength({ min: 10 ,max:10}).withMessage('please enter 10 digit mobile number'),
      
                

],authController.signup)

//Login route
router.post('/login',[
    body('email')
        .isEmail()
    ,
    body('password')
        .trim()
        .isLength({min:5})

],authController.login)




module.exports=router