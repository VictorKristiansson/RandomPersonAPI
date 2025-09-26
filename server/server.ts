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

app.get("/ping", (req, res) => {
  res.json({ message: "pong" });
});

app.get("/random-person", async (req, res) => {
  try {
    const respone = await fetch("https://randomuser.me/api/");
    if (!respone.ok) {
      throw new Error("Failed to fetch data");
    }
    const data = await respone.json();
    const randomUserFromApi = data.results[0];

    const formattedUser = {
      name: randomUserFromApi.name.first ?? "Unknown",
      age: randomUserFromApi.dob.age ?? 28,
      email: randomUserFromApi.email.toLowerCase() ?? "",
    };

    const result = userSchema.safeParse(formattedUser);
    if (!result.success) {
      return res.status(400).json({ error: result.error });
    }

    res.json(result.data);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
    console.error(error);
  }
});

app.post("/users", (req, res) => {
  const result = userSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: result.error });
  }
  users.push(result.data);
  res.status(201).json(result.data);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
