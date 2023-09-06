const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    roles:{
        user:{
            type:Number,
            default:201
        },
        Editor:Number,
        Admin:Number
    },
    password:{
        type:String,
        required:true
    },
    refreshToken:String
});

module.exports = mongoose.model('user', userSchema)