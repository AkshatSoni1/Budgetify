import mongoose, { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    email:{
        type: String,
        lowercase: true,
        required: [true, "Email is required!"],
        unique: [true, "Email already exists!"]
    },
    password:{
        type: String,
        required: [true, "Password is required!"]
    }
});

const User = mongoose.models.User || mongoose.model('User', userSchema);

export default User;
