import dotenv from "dotenv";
dotenv.config({ path: './.env' })
import connectDB from "./db/db.js"; 
import app from "./app.js";
connectDB()
.then(() => {
    app.on("error", (err) => {
        console.log("Error starting application on port", process.env.PORT || 5000, err);
        process.exit(1);
    });
    app.listen(process.env.PORT || 5000, () => {
        console.log(`application is running on port ${process.env.PORT || 5000}`);
    });
})
.catch((err) => {
    console.log("Error connecting to MongoDB and starting application", err);
});