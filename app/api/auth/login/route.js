import User from "@/models/user";
import connectToDB from "@/utils/connectDB"
import jwt from "jsonwebtoken";
import CryptoJS from "crypto-js";

export const POST = async (req) => {
    const { email, password } = await req.json();
    
    try {
        await connectToDB();

        const user = await User.findOne({ email });

        if(user){
        var bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
        var originalText = bytes.toString(CryptoJS.enc.Utf8);

        if(email === user.email && password === originalText){

            var token = jwt.sign({email: email}, process.env.JWT_SECRET)

            return new Response(JSON.stringify({user:user, token}), {status:200})

        }
        else{
            return new Response(JSON.stringify("Invalid Credentials!"), {status:400});
        }
    }
    else{
        return new Response(JSON.stringify("User not found! Sign Up"), {status:404})
    }
    } catch (error) {
        return new Response(JSON.stringify("Cannot Log In!"), {status:500});
    }
}