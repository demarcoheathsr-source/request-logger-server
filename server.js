const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

// Log every request
app.use((req, res, next) => {
  console.log("---- Incoming Request ----");
  console.log("Time:", new Date().toISOString());
  console.log("Method:", req.method);
  console.log("URL:", req.originalUrl);
  console.log("Headers:", req.headers);
  console.log("Body:", req.body);
  console.log("--------------------------");
  next();
});

// Basic route
app.get("/", (req, res) => {
  res.send("Request Logger Server Running");
});

// Webhook endpoint
app.post("/webhook", (req, res) => {
  res.json({
    status: "received",
    message: "Webhook logged"
  });
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
