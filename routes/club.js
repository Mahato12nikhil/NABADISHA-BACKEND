const clubController = require('../controller/club')
const router = require('express').Router();
const { body } = require('express-validator/check')
//const User = require('../Model/User')


router.get('/about',clubController.getAbout)
router.get('/gallery',clubController.getGallery)
router.get('/members',clubController.getMembers)
router.get('/activity',clubController.getActivity)

module.exports=router