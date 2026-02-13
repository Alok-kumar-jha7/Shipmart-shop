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
      match:[/^\S+@\S+\.\S+$/, "Invalid email"]
    },

    password: {
      type: String,
      required: true,
      minlength: [6,"Password should be at least 6 characters."],
      maxlength:[26,"password can not exceed 26 characters."],
      select:false,
    },
    phone:{
        type:String,
        required :[true,"Phone number is required"],
        unique:true,
         match:[/^\d{10}$/,"Invalid phone"]
    },
    

} ,{ timestamps: true });

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")){
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
 
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model('User', userSchema);