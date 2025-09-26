import express from "express";
import { z } from "zod";

const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/random-user", async (req, res) => {
  try {
    const respone = await fetch("https://randomuser.me/api/");
    if (!respone.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await respone.json();
    res.json(data);
  } catch (error) {}
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
