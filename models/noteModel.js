const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title:{
        type : String,
        require:[true,"Title is Required"],
    },
    content:{
        type:String,
        require:[true,"Content is Required"],
    },
    tags : {
        type:[String],
        default:[],
    },
    isPinned :{
        type:Boolean,
        default:false
    },
    userId:{
        type:String,
        require:[true,"UserID is Required"],
    }
},
{ timestamps: true }
)
module.exports = mongoose.model('Note',noteSchema);
