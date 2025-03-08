import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize app
const app = express();
const PORT = process.env.PORT || 5000;
// const MONGODB_URI =
//   process.env.MONGODB_URI || "mongodb://localhost:27017/verify";

// middleware
app.use(helmet());
app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

// test route
// test route
app.get("/", (req, res) => {
  console.log("Request received on /");
  res.send("Verify AML/KYC is running!");
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on PORT: ${PORT}`);
});

// database connection and server start
// const startServer = async () => {
//   try {
//     await mongoose.connect(MONGODB_URI);
//     console.log("Connected to MongoDB");

//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (error) {
//     console.error("Failed to start server:", error);
//     process.exit(1);
//   }
// };

// start server
// startServer();
