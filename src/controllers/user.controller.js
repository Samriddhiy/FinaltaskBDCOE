import { asyncHandler } from "../utils/AsyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse";
import fs from "fs";






const registerUser = async (req, res) => {
    console.log(email, email);
    const imageFile = req.files["image"] ? req.files["image"][0] : null;
    const { fullname, username, email, password } = req.body;
    console.log("name", fullname);
    console.log("username", username); 
    console.log("email", email);
    console.log(password);
    let uploadResponse;
    if (imageFile) {
        try {
            uploadResponse = await uploadOnCloudinary(imageFile.path);
            fs.unlinkSync(imageFile.path);
        } catch (error) {
            return res.status(500).json({ message: "Image upload to Cloudinary failed." });
        }
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }],
    });
     console.log(existedUser)
       if (existedUser) {
        return res.status(400).json({
            status: 409,
            message: "User already exists with this email or username",
          });
        }
        console.log("there")
        const user = await User.create({
            fullname,
            image: uploadResponse?.url || "",
            email,
            password,
            username: username.toLowerCase(),
        });
        const createdUser = await User.findById(user._id).select(
            "-password -refreshToken"
        );
        console.log(createdUser)
        if (!createdUser) {
            return res
            .status(500)
            .json({ message: "User registration failed. Please try again." });
        }
        return res
        .status(201)
        .json(new ApiResponse(200, createdUser, "User registered successfully"));
};


export {
    registerUser
};