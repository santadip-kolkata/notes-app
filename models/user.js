const mongoose = require('mongoose');

const User = mongoose.model('User', {
    fullname: {type:String,required:true},
    username: { type: String, required: true,unique:true },
    password: { type: String, required: true }
  });

module.exports=User