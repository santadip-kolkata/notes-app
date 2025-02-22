const User = require("../models/user");
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");

const dotenv = require('dotenv');
dotenv.config();

const login = async (user)=>{
    if(!user.username || !user.password)
    {
        return {message:"invalid credentials",status:200};
    }
    const username= user.username;
    const exists = await User.findOne({username});
    if(!exists)
    {
        return {'message':'invalid username',status:200}
    }
    const isPasswordValid =  await bcrypt.compare(user.password, exists.password);
    if (!isPasswordValid) { 
       return{ message: 'Invalid password',status:200 }
    };

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.TWJ, { expiresIn: process.env.JWT_EXPIRES_IN });
    return {token,status:200,message:'success',username:user.username};
}

const register = async (user)=>{
    try {
        if(!user.fullname || !user.username || !user.password)
        {
            return "invalid credentials";
        }
        const username=user.username;
        const exists = await User.findOne({ username });
        if (exists) return { message: 'User already exists' };
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password=hashedPassword;
        const savedUser = await User.create(user);
        return savedUser;
      } catch (error) {
        return null;
      }
}


module.exports={
    login,
    register
}