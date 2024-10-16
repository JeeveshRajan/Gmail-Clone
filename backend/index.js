import express from "express";
const app = express();
import dotenv from "dotenv";
import connectDb from "./db/connectdb.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import userRouter from "./routes/user.route.js";
import emailRouter from "./routes/email.route.js";

dotenv.config({});
connectDb();
const port = 8080;

const corsOption = {
  origin: "http://localhost:5173", // replace with our front-end URL
  credentials: true,
};

app.use(cors(corsOption));

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// app.get("/home", (req, res) => {
//   return res.status(200).json({ message: "Welcome to Express", success: true });
// });

//attaching routes

app.use("/api/v1/user", userRouter);
app.use("/api/v1/email", emailRouter);

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
