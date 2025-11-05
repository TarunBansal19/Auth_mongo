import User from "../model/User.model.js";
import crypto from "crypto";
import dotenv from "dotenv";
import sendVerificationEmail from "../utils/send-verificationEmail.js";
dotenv.config();


const registerUser = async (req, res) => {
    //res.send("Registered");
    //get data 
    const { name, email, password } = req.body;
    //validate data
    if (!name || !email || !password) {
        return res.status(400).json({ message: "All fields are required" });
    }
    console.log(req.body)
    console.log(email)

    console.log("test")
    if (!email.includes("@")) {
        return res.status(400).json(
            {
                message: "Invalid Email Provided"
            }
        )
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    //check user exist

    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(409).json({
                message: "User already exists. Please login"
            })
        }

        //create new user in db

        const user = await User.create({
            name,
            email,
            password,
        })
        console.log(user)
        if (!user) {
            return res.status(500).json({
                message: "Error creating user. please try again later"
            })
        }
        //generate verification token
        const verificationToken = crypto.randomBytes(32).toString("hex");
        console.log(verificationToken)

        //save token in db
        user.verificationToken = verificationToken;
        await user.save();

        console.log(user);

        //send email to user
        sendVerificationEmail(user.email , "Verify your email" , `Please click on the following link:
    ${process.env.BASE_URL}/api/users/verify/${verificationToken}`)

        //send success response to user
        return res.status(201).json({
            message: "User registered succesfully. Please check your email to verify your account",
            sucess: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal Server Error",
            sucess: false,
            error: error.message
        })
    }

};
export { registerUser }

