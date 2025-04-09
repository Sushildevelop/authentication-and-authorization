const { Sequelize, DataTypes } = require("sequelize");
const { sequelize } = require("../config/dbconnect");

const user=sequelize.define(
    "User",{
        name:{
             type:DataTypes.STRING
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true

        },
        password:{
             type:DataTypes.STRING,
             allowNull:false
        },
        phone:{
            type:DataTypes.STRING,
            unique:true
        }
    
        
    }
    
)
module.exports={user}