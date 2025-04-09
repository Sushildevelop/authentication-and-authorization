const { userValidator } = require("../middleware/userValidate");
const { validationResult } = require('express-validator');
const { user } = require("../models/userModel");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { protect } = require("../middleware/authToken");
require('dotenv').config();

const creatUser = async (req, res) => {
    try {
        if (!req.body) {
            return res.status(400).json("Body is not fetching")

        }
        const error = validationResult(req)
        if (!error.isEmpty()) {
            return res.status(400).json({ error: error.array() });

        }

        const { name, email, password, phone } = req.body
        const hashed = await bcrypt.hash(password, 10)

        const creat_user = await user.create({ email, name, password: hashed, phone })
        if (!creat_user) {
            return res.status(400).json("User is not created")
        }
        return res.status(200).json(creat_user)
    } catch (error) {
        return res.status(400).json({ error: error.message })

    }


}

const getuser = async (req, res) => {
    try {
        const get = await user.findAll()
        return res.status(200).json(get)

    } catch (error) {
        return res.status(400).json({ error: error.message })

    }
}

const login = async (req, res) => {
    try {

        const { email, password } = req.body
        if (!req.body) {
            return res.status(400).json("Body is not fetching")
        }
        const userlogin = await user.findOne({ where: { email } })

        const logged = await bcrypt.compare(password, userlogin.password)

        // if(userlogin.password !=password){
        //     return res.status(400).json("Password is not matching ")
        // }
        if (!logged) {
            return res.status(400).json("Invalid Password")
        }

        // return res.status(200).json({message:"Login successfully",userlogin:{email:userlogin.email}})
        const token = jwt.sign({ email: userlogin.email }, process.env.JWT, { expiresIn: "1h" })
        res.json({ token })

    } catch (error) {
        return res.status(400).json({ error: error.message })

    }
}
const getToken = async (req, res) => {
    try {

        // id from token
        //     let auth=req.headers.authorization
        // //   let newAuth=  auth.substring(7)
        // console.log("printig req ---------------->",req.headers.authorization);
        const email = req.user.email
        // console.log("Dynamic User ID from token:", userId);
        const user1 = await user.findOne({
            where: { email },
            attributes: ["id", "email"]
        })

        if (!user1) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ user: user1 })

    } catch (error) {
        console.log("printing error==========>", error)
        res.status(400).json({ error: error.message });

    }
}
module.exports = { creatUser, getuser, login, getToken }


