import { model, Schema } from "mongoose";

const userSchema = new Schema({
    fullname: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    mobile: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: Boolean,
        default: true,
    },
    role: {
        type: String,
        default: "user",
        enum: ['user']
    },
}, { timestamps: true });

const Usermodel = model('User', userSchema);
export default Usermodel;
