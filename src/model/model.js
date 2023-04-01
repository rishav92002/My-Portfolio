const mongoose = require('mongoose');

const smodel= new mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    message:{
        type: String,
        require: true
    }
});

const userdetail = new mongoose.model('contactmedata', smodel);
module.exports= userdetail;