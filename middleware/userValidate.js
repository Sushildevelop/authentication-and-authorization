const {body}=require('express-validator')

const userValidator=[
    body('name')
    .exists({ checkFalsy: true }).withMessage('Username is required')
    .isLength({ min: 3 }).withMessage('Username must be at least 3 characters'),

    body('email')
    .exists({checkFalsy:true}).withMessage('User email is required')
    .isLength({min:4}).isEmail().withMessage('Please enter a valid email'),

    body('password')
    .exists({checkFalsy:true}).withMessage("Password is required")
    .isLength({min:5}).withMessage("Password must be at least 6 characters"),

    body('phone')
    .exists({checkFalsy:true}).withMessage("Phone number is required")
    .isLength({min:8}).withMessage("Phone number must be at leat 8 Number")

]

module.exports={userValidator}