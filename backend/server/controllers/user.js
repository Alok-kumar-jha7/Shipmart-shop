import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userModel.js";
import ErrorHandler from "../middlewares/error.js";

export const  registerUser = catchAsyncError(async(req,res,next)=>{
    
        const {name,email,password,phone} = req.body;
        if(!name || !email || !password || !phone){
            return next(new ErrorHandler("Please fill all the fields",400));
        }
        function validatePhoneNumber(phone){
            const phoneRegex = /^\d{10}$/;
            return phoneRegex.test(phone);

        }

        if(!validatePhoneNumber(phone)){
            return next(new ErrorHandler("Invalid phone number",400));
        }

        const existingUser = await User.findOne({ $or: [{ email }, { phone }]});
        if(existingUser){
            return next(new ErrorHandler("User already exists",400));
        }

        const RegisterNewUser = await User.create({
            name,email,password,phone
        }); 
        await RegisterNewUser.save();
         res.status(201).json({
        success: true,
        message: "User registered successfully",
        user:RegisterNewUser,
    });
    
})