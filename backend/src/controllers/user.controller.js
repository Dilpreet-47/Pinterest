import {asyncHandler }from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {ApiRes} from "../utils/ApiRes.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import User from "../models/user.models.js";

const registerUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
}

  const existingUser = await User.findOne({email});

  if(existingUser){
    throw new ApiError(409, "User Exists");
  }

  const user = await User.create({  
    email,
    password
  })

  const createdUser = await User.findById(user._id).select("-password -refreshToken");

  if(!createdUser){
    throw new ApiError(500, "something went wrong while registering the user");
  }

  return res
  .status(201)
  .json(new ApiRes(201, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res) => {
  const {email, password} = req.body;

  if(!email || !password){
    throw new ApiError(400, "email and password are required");
  }

  const user = await User.findOne({email});

  if(!user){
    throw new ApiError(404, "User not exist");
  }

  const isPasswordMatched = await user.isPasswordCorrect(password);

  if(!isPasswordMatched){
    throw new ApiError(401, "Invalid credentials");
  }
  const refreshToken = user.generateRefreshToken();
  const accessToken = user.generateAccessToken();

  user.refreshToken = refreshToken;
  user.accessToken = accessToken;
  await user.save({validateBeforeSave: false});

  const loggedinUser = await User.findById(user._id).select("-password -refreshToken");

  if(!loggedinUser){
    throw new ApiError(500, "something went wrong while logging in the user");
  }

  const options = {
    httpOnly : true,
    secure : true
  }

  return res
  .status(200)
  .cookie("accessToken", accessToken)
  .cookie("refreshToken", refreshToken)
  .json(new ApiRes(200, loggedinUser, "User logged in Successfully"));
})


const LogoutUser = asyncHandler(async(req, res) => {
  const user = await User.findById(req.user._id);

  if(!user){
    throw new ApiError(404, "User not found");
  }

  user.refreshToken = undefined;
  await user.save({validateBeforeSave: false});

  return res
  .status(200)
  .clearCookie("accessToken")
  .clearCookie("refreshToken")
  .json(new ApiRes(200, "User logged out Successfully"));
});

export { registerUser, loginUser, LogoutUser };
