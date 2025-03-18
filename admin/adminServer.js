const express = require("express");
// const authRoutes = require("./routes/authRoutes");
const adminRoutes =require("./routes/adminRoutes")

const adminApp = express();
adminApp.use(express.json());


adminApp.use("/auth", adminRoutes);
// adminApp.use("/api",adminRoutes);

module.exports = adminApp;