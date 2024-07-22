const jwt = require('jsonwebtoken');
const User = require('./models/userModel');
const Note = require('./models/noteModel')
const dotEnv = require('dotenv');
// const authenticateToken = (req,res,next) => {
//     const authHeader = req.headers["authorization"];
//     const token = authHeader && authHeader.split(" ")[1];

//     if (!token) {
//         res.status(400).json({message:"Token is Required"})
//     }
//     jwt.verify(token,process.env.SECRET_TOKEN,(err,user)=>{
//         if(err) {
//             res.status(400).json({err})
//             req.user = user;
//             next();
//         }
//     })
// }
// module.exports = {
//     authenticateToken
// }
dotEnv.config()
//SECRET_TOKEN
const authenticateToken = async(req,res,next) => {
    const token = req.headers.token;
    if (!token) {
        res.status(400).json({message:"Token is Required"})
    }
    // jwt.verify(token,process.env.SECRET_TOKEN,(err,user)=>{
    //     if(err) {
    //         res.status(400).json({err})
    //         req.user = user;
    //         next();
    //     }
    // })
    try {
        const decoded = jwt.verify(token, process.env.SECRET_TOKEN)
        const user = await User.findById(decoded.userId);

        if (!user) {
            return res.status(404).json({ error: "user not found" })
        }

        req.userId = user._id

        next()
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: "Invalid token" });
    }
}
module.exports = {
    authenticateToken
}