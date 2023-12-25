import express from "express";
import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import postRoutes from "./routes/postRoutes.js";
import cors from "cors";

const app = express();

// middleware for parsing req.body (json read)
app.use(express.json());
app.use("/posts", postRoutes);
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"],
  })
);

//Connect db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Database Connected");
    app.listen(process.env.PORT, () =>
      console.log(`App started at http://localhost:${process.env.PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
