import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import AuthRouter from "./routes/auth.routes.js";
import StripeRouter from "./routes/stripe.routes.js";
import UserRouter from "./routes/user.routes.js";

dotenv.config();

const app = express();

app.use(cookieParser());

app.use((req, res, next) => {
  if (req.originalUrl === "/api/stripe/webhook") {
    next();
  } else {
    express.json()(req, res, next);
  }
});
// app.use(express.json());

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "*",
    credentials: true,
  })
);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection failed:", err));

// Error Handling Middleware (Fixed
app.use((err, req, res, next) => {
  const code = err.status || 500;
  const message = err.message || "Internal Server Error";

  res.status(code).json({
    success: false,
    message,
    code,
  });
});

// Routes
app.use("/api/auth", AuthRouter);
app.use("/api", UserRouter);
app.use("/api/stripe", StripeRouter);

// Start Server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
