import App from "./src/app.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();
mongoose.connect(process.env.MONGODB_CONNECTION_STRING);

const app = new App();
app.setup();
app.start();
