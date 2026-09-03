const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();

const app = express();

// Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

// ─── Security & Middleware ────────────────────────────────────────────────────

// Helmet for security headers (optional: npm install helmet)
try {
  const helmet = require("helmet");
  app.use(helmet());
} catch (_) { /* helmet not installed — safe to skip */ }

// Rate limiting (optional: npm install express-rate-limit)
try {
  const rateLimit = require("express-rate-limit");
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200,
    message: { message: "Too many requests, please try again later." },
  });
  app.use("/api/", limiter);
} catch (_) { /* not installed — safe to skip */ }

// Data Sanitization again NoSQL query injection
try {
  const mongoSanitize = require("express-mongo-sanitize");
  app.use(mongoSanitize());
} catch (_) { /* safe to skip */ }

// Data Sanitization against XSS
try {
  const xss = require("xss-clean");
  app.use(xss());
} catch (_) { /* safe to skip */ }

// CORS
const allowedOrigins = process.env.FRONTEND_URL
  ? [process.env.FRONTEND_URL, "http://localhost:5173"]
  : ["http://localhost:5173", "http://localhost:3000"];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// ─── Database ────────────────────────────────────────────────────────────────
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use("/api/users",    require("./routes/UserRoutes"));
app.use("/api/products", require("./routes/ProductRoutes"));
app.use("/api/cart",     require("./routes/CartRoutes"));
app.use("/api/orders",   require("./routes/OrderRoutes"));
app.use("/api/payments", require("./routes/PaymentRoutes"));
app.use("/api/upload",   require("./routes/UploadRoutes"));
app.use("/api/quotes",   require("./routes/QuoteRoutes"));
app.use("/api/admin",    require("./routes/AdminRoutes"));

// ─── Health check ────────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({
    status: "ok",
    message: "Ambica Alum Industries API",
    version: "2.0.0",
    timestamp: new Date().toISOString(),
  });
});

// ─── 404 handler ─────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

// ─── Global error handler ────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err.message);
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message || "Internal Server Error",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack }),
  });
});

// ─── Start ───────────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`🌐 Mode: ${process.env.NODE_ENV || "development"}`);
});