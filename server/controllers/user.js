import { User } from '../models/user.js';
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken" ;
import sendMail from '../middleware/sendEmail.js';
import TryCatch from '../middleware/trycatch.js';

export const register = TryCatch(async(req,res)=> {
    const {email,name,password} = req.body

    let user = await User.findOne({email}) ;

    if (user)
        return res.status(400).json({
            message: "This User Is Registered Already"
    });

    const encryptedPassword = await bcrypt.hash(password,10) ;

    user = {
        name ,
        email,
        password: encryptedPassword ,
    } ;

    const otp = Math.floor(Math.random() * 1000000) ;
    
    const activationToken = jwt.sign({
        user,
        otp,
    },
    process.env.activationSecret,
    {
        expiresIn: "5m" ,
    }) ;
    const data = {
        name,
        otp,
    };

    await sendMail(
        email,
        "Learn Anywhere",
        data
    )

    res.status(200).json({
        message: "The OTP Has Been Sent To Your Email" ,
        activationToken,
    }) ;
})

export const verifyUser = TryCatch(async(req,res)=>{
    const {otp , activationToken} = req.body ;

    const verify = jwt.verify(activationToken, process.env.activationSecret) ;

    if (!verify) return res.status(400).json({
        message: "Your OTP Has Expired" ,
    }) ;

    if (verify.otp !== otp) return res.status(400).json({
        message: "Your Entered An Invalid OTP" ,
    }) ;

    await User.create ({
        name: verify.user.name ,
        email: verify.user.email ,
        password: verify.user.password ,
    })

    res.json({
        message: "User Has Been Registered" ,
    })
})