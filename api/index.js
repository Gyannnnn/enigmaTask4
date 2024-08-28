const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");

app.use(cors());
app.use(express.json()); // Moved this here

// db connection
mongoose
  .connect(
    "mongodb+srv://higyanaranjanpatra:Tc6xahExHftrMRhr@cluster0.eykx1.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => {
    console.log("Successfully Connected To The Database");
  })
  .catch((err) => {
    console.log(err);
  });

// routes import
const authRoutes = require("./Routes/auth.routes.js");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/api", authRoutes);

app.listen(3000, () => {
  console.log("Server Is Running At 3000");
});
