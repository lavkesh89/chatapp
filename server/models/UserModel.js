import mongoose from "mongoose";
import {genSalt, hash} from "bcrypt";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:[true,"Email is Required."],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Password is required"],
    },
    firstName:{
        type: String,
        required: false,
    },
    lastName:{
        type:String,
        required: false,
    },
    image:{
        type:String,
        required:false,
        default: 'default-image-path-or-url'
    },
    color:{
        type:Number,
        required:false,
    },
    profileSetup:{
        type: Boolean,
        default: false,
    },
});


// userSchema.pre("save",async function (next){
//     const salt =  await genSalt();
//     this.password= await hash(this.password,salt);
//     next();
// });
userSchema.pre("save", async function (next) {
    try {
      // Check if the password field is modified
      if (!this.isModified("password")) {
        return next();
      }
  
      // Generate a salt with 10 rounds (you can adjust the number)
      const salt = await genSalt(10); // Specify the number of rounds explicitly
  
      // Hash the password using bcrypt
      this.password = await hash(this.password, salt);
  
      next();
    } catch (error) {
      next(error); // Pass the error to the next middleware
    }
  });
  

const User = mongoose.model("Users",userSchema);

export default User;