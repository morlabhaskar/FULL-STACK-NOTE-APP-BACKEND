const User = require('../models/userModel');
const jwt = require('jsonwebtoken')

const userRegister = async(req,res) => {
    const {fullName,email,password} = req.body;

    if(!fullName) {
        res.status(400).json({message:"FullName is Required"});
    }
    if(!email) {
        res.status(400).json({message:"Email is Required"});
    }
    if(!password) {
        res.status(400).json({message:"Password is Required"});
    }
    const isUser = await User.findOne({ email: email });

    if(isUser) {
        res.status(400).json({message:"User Already Exist"})
    }
    const user = new User({
        fullName,
        email,
        password
    });
    await user.save();

    const accessToken = jwt.sign({user},process.env.SECRET_TOKEN,{expiresIn:"24h"});
    return res.status(200).json({user,accessToken,message:"User Register Successfully"})
}

// const userLogin = async (req,res) => {
//     const {email,password} = req.body;
//     if(!email) {
//         res.ststus(400).json({message:"Email is Required"})
//     }
//     if(!password) {
//         res.ststus(400).json({message:"Password is Required"})
//     }
//     const userInfo = await User.findOne({email:email});
//     if(!userInfo) {
//         res.status(400).json({message:"User Not Found"})
//     }
//     if(userInfo.email == email && userInfo.password == password) {
//         const user = {user:userInfo};
//         const accessToken = jwt.sign(user,process.env.SECRET_TOKEN,{expiresIn:"24h"});
//         return res.status(200).json({email,accessToken,message:"User Login Successfully"})
//     } else {
//         return res.status(400).json({message:"Invalid Credentials"})
//     }

// }
const userLogin = async (req,res) => {
    const {email,password} = req.body;
    try {
        if(!email) {
            res.status(400).json({message:"Email is Required"})
        }
        if(!password) {
            res.status(400).json({message:"Password is Required"})
        }
        const userInfo = await User.findOne({email:email});
        if(!userInfo) {
            res.status(400).json({message:"User Not Found"})
        }
        const token = jwt.sign({ userId: userInfo._id }, process.env.SECRET_TOKEN, { expiresIn: "1h" })
        const userId = userInfo._id;
        res.status(200).json({ success: "Login successful", token, userId });
        // console.log(email, "this is token", token)
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal server error" })
    }
    // if(userInfo.email == email && userInfo.password == password) {
    //     const user = {user:userInfo};
    //     const accessToken = jwt.sign(user,process.env.SECRET_TOKEN,{expiresIn:"24h"});
    //     return res.status(200).json({email,accessToken,message:"User Login Successfully"})
    // } else {
    //     return res.status(400).json({message:"Invalid Credentials"})
    // }

}

const getAllUsers = async(req,res) => {
    try {
        const users = await User.find({});
        return res.status(200).json({ success: "All Users Retrieved successfully" ,users})
    } catch (error) {
        console.log(error)
        res.status(500).json({error:"Internal Server Error"});
    }
}
const getUserById = async (req,res) => {
    try {
        const userId = req.params.id
        const user = await User.findById(userId);
        if(!user) {
            return res.status(500).json({error:"User Not Found"});
        }
        return res.status(200).json({ success: "User Retrived successfully",user })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Internal server error" })
    }
}

module.exports = {userRegister,userLogin,getUserById,getAllUsers}