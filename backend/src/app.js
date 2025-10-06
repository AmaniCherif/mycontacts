const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const contactRoutes = require("./routes/contacts");

const app = express();

app.use(express.json());
app.use(cors());

// Petite route test
app.get("/", (req, res) => {
  res.send("API is running");
});

//les routes principales
app.use("/auth", authRoutes);          
app.use("/api/contacts", contactRoutes); 

module.exports = app;
