import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.routes.js"; // Added .js extension (required in ES Modules)

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json({ limit: "16kb" })); // limit prevents huge JSON attacks
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("/public")); // To store local files/images temporarily
app.use(cookieParser());

// Routes Declaration
app.use("/api/v1/users", userRouter);

export default app;