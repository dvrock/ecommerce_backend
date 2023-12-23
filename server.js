const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());
const authcontroller = require("./controllers/authcontroller");
const maincontroller = require("./controllers/controller");
const { authorizer } = require("./authorizer/authorizer")

app.use("/", express.json());
app.post("/signup", authcontroller.SignUp);

app.use((req, res, next) => {
  setImmediate(() => {
    // Simulating an error
    const error = new Error('Simulated error');
    next(error);
  });
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error('Global Error Handler:', err.message);
  res.status(500).json({ error: 'Internal Server Error' });
});
app.use("*", (req, res, error) => {
  res.json({ message: error.message, status: 400 });
});
const port = 3001 || 3000 || "URL";
app.listen(port, () => {
  try {
    console.log("server started at", port);
  } catch (err) {
    console.log("error in server", 500);
  }
});
