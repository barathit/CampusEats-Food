// server.js

const express = require("express");
const app = express();

// Define a simple route
app.get("/", (req, res) => {
  res.send("Response from Campuseats");
});

// Server listening on port 3000
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
