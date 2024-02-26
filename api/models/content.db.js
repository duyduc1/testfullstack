const mongoose = require("mongoose")

const contentUser = new mongoose.Schema({
    content : {
        type:String,
        required:true,
    },
    Categories:{
        type:String,
        requried:true
    },
    token: {
        type: String,
        requried:true
    }
})

const contentSchema = new mongoose.model("contents" , contentUser)

module.exports = contentSchema;