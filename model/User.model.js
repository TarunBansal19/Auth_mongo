import mongoose from "mongoose";
import bcrypt from "bcryptjs";


const userSchema = new mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        role: {
            type:String,
            enum: ["user" , "admin"], //select only one of these two
            default: "user"
        },
        isVerified : {
            type: Boolean,
            default: false,
        },
        verificationToken : {
            type: String,
        },
        resetPasswordToken : {
            type: String,
        },
        resetPasswordExpires : {
            type: Date,
        },
    }
 , {
    timestamps: true, //by Doing this mongoose is making createdAt , updatedAt
   }
);

//hooks are functions which are called before (pre) or after (post) certain activity/actions

userSchema.pre("save" , async function(next){
    if(this.isModified("password")){
        this.password = await bcrypt.hash(this.password , 10);
    }
    next();
})


const User =  mongoose.model("User" , userSchema) //User is a model based on userSchema

//in db , User -> lowercase , plural by MongoDB

export default User

