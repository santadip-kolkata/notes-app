const express = require('express');
const router = express.Router();
const userController = require("../controllers/userController");
const user = require('../models/user');

router.post('/login',userController.login);
router.post('/register',userController.register);


module.exports=router