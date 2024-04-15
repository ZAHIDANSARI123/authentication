
import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please username'],
        unique:true
    },
    email: {
        type: String,
        required: [true, 'Please proived email'],
        unique:true
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    forgotPaswwordToken: String,
    forgotPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date,
})

const User = mongoose.models.users || mongoose.model(userSchema)

export default User