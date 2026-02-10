import errorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError";
import { User } from "../models/userModel.js";

export const  registerUser = catchAsyncError(async(req,res,next)=>{
     try {
        const {name,email,password,phone,isVerified} = req.body;
        if(!name||!email||!password||!phone||!isVerified){
            return next(new errorHandler("Please fill all the fields",400));
        }
        function validatePhoneNumber(phone){
            const phoneResgex = /^+91\d{10}$/;
            return phoneResgex.test(phone);

        }
     } catch (error) {
        
     }
})