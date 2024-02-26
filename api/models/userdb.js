const mongoose = require("mongoose")

const userLoginRegister = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    numberphone: {
        type: String,
        required: true
    },
    admin: {
        type: Boolean,
        default: false
    },
    token: {
        type: String
    }
},
    { timestamps: true }
)

const registerLoginSchema = new mongoose.model("users", userLoginRegister)

module.exports = registerLoginSchema

