import jwt from 'jsonwebtoken'
import {User} from "../models/user.js"

export const isAuth = async(req, res, next) => {
    try{
        console.log("trying to login")
        const token = req.headers.token;

        if(!token) 
            return res.status(403).json({
            message: "Please login ",
        })

        const decodedData = jwt.verify(token, process.env.Jwt_Sec)

        req.user = await User.findById(decodedData._id)
        console.log("Logged In")

        next();

    }catch(error){
        res.status(500).json({
            message: "Login First",
        })
    }
}

export const isAdmin = (req, res, next) => {
    try {
      console.log("Trying to auth")
      if (req.user.role !== "admin")
        return res.status(403).json({
          message: "You are not admin",
        });

      console.log("Auth Done")
      
  
      next();
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };