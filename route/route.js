const express=require('express');
const { userValidator } = require('../middleware/userValidate');
const { creatUser, getuser, login, getToken } = require('../controller/userController');
const { protect } = require('../middleware/authToken');
// const { authenticateToken } = require('../middleware/authToken');

const router=express.Router()

router.get('/get-user',getuser)
router.post('/create-user',userValidator,creatUser)
router.post('/userLogin',login)
router.get('/gettoken',protect,getToken)


module.exports={router}