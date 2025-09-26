import { count } from "console";
import express from "express";
import { z } from "zod";

const app = express();
const PORT = 3000;
app.use(express.json());

const userSchema = z.object({
  name: z.string().min(3).max(12),
  age: z.number().min(18).max(100).default(28).optional(),
  email: z.string().email().toLowerCase(),
});

type User = z.infer<typeof userSchema>;

let users: User[] = [];

app.get("/random-user", async (req, res) => {
  try {
    const respone = await fetch("https://randomuser.me/api/");
    if (!respone.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await respone.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
