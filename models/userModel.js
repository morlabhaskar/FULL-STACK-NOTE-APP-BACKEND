const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    fullName:{
        type : String,
        require:[true,"FullName is Required"],
    },
    email:{
        type:String,
        require:[true,"Email is Required"],
    },
    password : {
        type:String,
        require:[true,"Password is Required"],
    }
},
{ timestamps: true }
)
module.exports = mongoose.model('User',userSchema);
