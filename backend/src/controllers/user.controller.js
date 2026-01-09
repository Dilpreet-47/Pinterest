import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiRes from "../utils/ApiRes.js";
import User from "../models/user.models.js";

const registerUser = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if ([email, password].some((field) => field.trim() === "")) {
    throw new ApiError(400, "All fields are compulsary required");
  }

  const existingUser = await User.findOne(email);

  if(existedUser){
    throw new ApiError(409, "User Exists");
  }

  const user = await User.create({
    email,
    password
  })

  const createdUser = await User.findbyId(user._id).select("-password -refreshToken");

  if(!createdUser){
    throw new ApiError(500, "something went wrong while registering the user");
  }

  return res
  .status(201)
  .json(new ApiRes(200, createdUser, "User registered Successfully"));
});

const loginUser = asyncHandler(async (req, res, next) => {
  const {email, password} = req.body;

  if(!email && !password){
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

  user.refreshToken = refreshToken;

  await user.save();

  const createdUser = await User.findbyId(user._id).select("-password -refreshToken");

  if(!createdUser){
    throw new ApiError(500, "something went wrong while logging in the user");
  }

  return res
  .status(200)
  .json(new ApiRes(200, createdUser, "User logged in Successfully"));
})


export { registerUser, loginUser };
