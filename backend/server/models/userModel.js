import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: [true, "Name is required"],
      minlength: 2,
      maxlength: 30,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: [6,"Password should be at least 6 characters."],
      maxlength:[26,"password can not exceed 26 characters."],
    },
    phone:{
        type:String,
        requqired:[true,"Phone number is required"],
        unique:true,
    },
    isVerified:{
       type:Boolean,
       default:false,
       verificationCode:Number,
       verificationCodeExpires:Date,
       resetPasswordToken:String,
       resetPasswordExpires:Date,
    },
    

} ,{ timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
}

export const User = mongoose.model('User', userSchema);