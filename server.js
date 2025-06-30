require("@dotenvx/dotenvx").config();
const express = require("express");
const cors = require("cors");
const { connectDB } = require("./src/config/db");
const userAuthRoute = require("./src/routes/userAuthRoute");
const port = process.env.PORT || 5000;
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Root route
app.get("/", (req, res) => {
  res.send("Hello from Event Management Server..");
});

// Routes
app.use("/api/user", userAuthRoute);

// Start server and connect to database
async function startServer() {
  try {
    await connectDB();
    console.log("Database connected successfully!");
  } catch (error) {
    console.error("Failed to start server:", error);
    // process.exit(1);
  }
}

// Start the server
startServer();

app.listen(port, () => {
  console.log(`Event Management is running on port ${port}`);
});
