const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique:true
    },
    username: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    profileName: {
        type: String
    },
    profilePicture: {
        data: Buffer,
        contentType: String,
    }
})
module.exports = mongoose.model('postusers', userSchema);