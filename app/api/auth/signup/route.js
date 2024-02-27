import User from "@/models/user"
import connectToDB from "@/utils/connectDB";
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

export const POST = async (req) => {
    const { email, password } = await req.json();

    try{
        await connectToDB();
        
        const user = await User.findOne({email});

        if(user){
            return new Response("Email already exists", {status:400})
        }

        const newUser = new User({
            email, 
            password: CryptoJS.AES.encrypt(password, process.env.SECRET_KEY).toString()
        })

        await newUser.save();

        var token = jwt.sign({email: email}, process.env.JWT_SECRET)

        return new Response(JSON.stringify({user:newUser, token}),{status:200})
    }
    catch(error){
        return new Response('Cannot sign up!', {status:500})
    }

}