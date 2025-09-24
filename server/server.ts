// Import Express
import express from "express";

// Express application instance
const app = express();

// Set the port
const PORT = 3000;

//  Get -Greet
app.get("/", (req, res) => {
  res.send("Hello!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
