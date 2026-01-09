import jwt from "jsonwebtoken";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import User from "../models/user.models.js";

export const authMiddleware = asyncHandler(async (req, res, next) => {
    const { accessToken } = req.cookies;

    if (!accessToken) {
        throw new ApiError(401, "Unauthorized");
    }

    try {
        const decoded = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
        const user = await User.findById(decoded._id);

        if (!user) {
            throw new ApiError(404, "User not found");
        }

        req.user = user;
        next();
    } catch (error) {
        throw new ApiError(401, "Unauthorized");
    }
});